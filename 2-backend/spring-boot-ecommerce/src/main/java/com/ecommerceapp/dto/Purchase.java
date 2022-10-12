package com.ecommerceapp.dto;

import com.ecommerceapp.entity.Address;
import com.ecommerceapp.entity.Customer;
import com.ecommerceapp.entity.Order;
import com.ecommerceapp.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
