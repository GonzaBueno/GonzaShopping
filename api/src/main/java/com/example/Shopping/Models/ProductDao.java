package com.example.Shopping.Models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProductDao extends JpaRepository<Product, Integer> {
}
