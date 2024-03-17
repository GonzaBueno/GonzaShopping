package com.example.Shopping.ServicesImp;

import com.example.Shopping.Models.Product;
import com.example.Shopping.Models.ProductDao;
import com.example.Shopping.Services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductsServiceImp implements ProductsService {
    @Autowired
    private ProductDao productDao;
    private RestTemplate restTemplate;

    @Autowired
    public ProductsServiceImp(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private static final String API_URL = "https://fakestoreapi.com/products";
    private static final String PUBLIC_KEY = "";

    @Override
    @Transactional
    public List<Product> getProducts() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("X-Authorization", PUBLIC_KEY);
            ResponseEntity<Product[]> response = restTemplate.exchange(API_URL, HttpMethod.GET, new HttpEntity<>(headers), Product[].class);
            Product[] products = response.getBody();

            if (products != null && products.length > 0) {
                return Arrays.asList(products);
            } else {
                // No hay productos disponibles
                return Collections.emptyList();
            }
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Exception while calling endpoint of Api",
                    e
            );
        }
    }


    @Override
    public List<Product> getProductsSortedByPrice(String sortOrder) {
        List<Product> products = getProducts();
        Comparator<Product> comparator;

        if ("asc".equals(sortOrder)) {
            comparator = Comparator.comparingDouble(Product::getPrice);
        } else if ("desc".equals(sortOrder)) {
            comparator = Comparator.comparingDouble(Product::getPrice).reversed();
        } else {
            throw new IllegalArgumentException("El parámetro 'sp' debe ser 'asc' o 'desc'");
        }

        List<Product> sortedProducts = products.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
        return sortedProducts;
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        List<Product> productList = getProducts();
        List<Product> filteredProducts = new ArrayList<>();
        for (Product product : productList) {
            if (product.getCategory().equalsIgnoreCase(category)) {
                filteredProducts.add(product);
            }
        }

        if (filteredProducts.isEmpty()) {
            System.out.println("No hay productos en la categoría: " + category);
        }

        return filteredProducts;
    }
    @Override
    public List<Product> getProductsFilteredAndSorted(String category, String sortOrder){
        List<Product> products = getProducts();
        Comparator<Product> comparator = null;

        if (sortOrder != null && !sortOrder.isEmpty()){
            if ("asc".equals(sortOrder)) {
                comparator = Comparator.comparingDouble(Product::getPrice);
            } else if ("desc".equals(sortOrder)) {
                comparator = Comparator.comparingDouble(Product::getPrice).reversed();
            } else {
                throw new IllegalArgumentException("El parámetro 'sp' debe ser 'asc' o 'desc'");
            }
        }
        Stream<Product> filteredProductsStream = products.stream();
        if (category != null && !category.isEmpty()) {
            filteredProductsStream = filteredProductsStream
                    .filter(product -> product.getCategory().equalsIgnoreCase(category));
        }

        List<Product> filteredAndSortedProducts = filteredProductsStream
                .sorted(comparator != null ? comparator : Comparator.comparingDouble(Product::getPrice))
                .collect(Collectors.toList());

        if (filteredAndSortedProducts.isEmpty()) {
            System.out.println("No hay productos que cumplan con los criterios especificados.");
        }

        return filteredAndSortedProducts;
    }

}
