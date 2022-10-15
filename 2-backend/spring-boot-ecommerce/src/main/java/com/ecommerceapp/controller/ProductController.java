package com.ecommerceapp.controller;

import com.ecommerceapp.dao.ProductRepository;
import com.ecommerceapp.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;


    @PutMapping("/setProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updateProduct = productRepository.getById(id);
        updateProduct.setSku(product.getSku());
        updateProduct.setName(product.getName());
        updateProduct.setDescription(product.getDescription());
        updateProduct.setUnitPrice(product.getUnitPrice());
        updateProduct.setImageUrl(product.getImageUrl());
        updateProduct.setActive(product.isActive());
        updateProduct.setUnitsInStock(product.getUnitsInStock());
        updateProduct.setDateCreated(product.getDateCreated());
        updateProduct.setLastUpdated(product.getLastUpdated());
        productRepository.save(updateProduct);
        return new ResponseEntity("Product Updated!", HttpStatus.OK);
    }
}
