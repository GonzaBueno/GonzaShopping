package com.example.Shopping.Controllers;

import com.example.Shopping.Models.Category;
import com.example.Shopping.Models.Product;
import com.example.Shopping.Services.ProductsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @GetMapping("/products/{sortOrder}")
    public ResponseEntity<List<Product>> sortedByPrice(@PathVariable("sortOrder") String sortOrder, Model model){
        List<Product> products = productsService.getProductsSortedByPrice(sortOrder);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/category")
    public ResponseEntity<List<Product>> filteredByCategory(@RequestBody Category category, Model model){
        String category1 = category.getCategory();
        List<Product> products = productsService.getProductsByCategory(category1);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> filteredAndSorted(@RequestParam(name = "category", required = false) String category,
                                                           @RequestParam(name = "sortOrder", required = false) String sortOrder) {
        List<Product> products = productsService.getProductsFilteredAndSorted(category, sortOrder);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
