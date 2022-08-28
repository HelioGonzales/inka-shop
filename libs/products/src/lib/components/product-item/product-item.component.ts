import { Product } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@inka-shop/orders';
import { CartItem } from '@inka-shop/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartSvc.setCartItem(cartItem);
  }
}
