package com.ecommerceapp.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="order_item_temp")
@Getter
@Setter
public class OrderItemTemp extends OrderItem{

}
