import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [],
})
export class CartIconComponent implements OnInit {
  cartCount? = 0;

  constructor(private carSvc: CartService) {}

  ngOnInit(): void {
    this.carSvc.cart$.subscribe((res) => {
      this.cartCount = res?.items?.length ?? 0;
    });
    // this.cartCount = this.carSvc.getCart().items?.length;
  }
}
