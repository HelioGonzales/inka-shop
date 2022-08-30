import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartItemsDetailed } from '../../models/cart.model';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemsDetailed[] = [];
  cartCount = 0;
  endSubs$!: Subscription;

  constructor(
    private router: Router,
    private cartSvc: CartService,
    private ordersSvc: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemsDetailed) {
    this.cartSvc.deleteCartItem(cartItem.product.id);
  }

  private _getCartDetails() {
    this.endSubs$ = this.cartSvc.cart$.subscribe((resCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = resCart?.items?.length ?? 0;
      resCart.items?.forEach((cartItem: any) => {
        this.ordersSvc
          .getProduct(cartItem.productId)
          .subscribe((resProduct) => {
            this.cartItemsDetailed.push({
              product: resProduct,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs$.unsubscribe();
  }
}
