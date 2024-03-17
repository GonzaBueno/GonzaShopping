package com.example.Shopping.Services;

import com.example.Shopping.Models.Product;

import java.util.List;

public interface ProductsService {
    public List<Product> getProducts();
    public List<Product> getProductsSortedByPrice(String sortOrder);
    public List<Product> getProductsByCategory(String category);
    public List<Product> getProductsFilteredAndSorted(String category, String sortOrder);
}
