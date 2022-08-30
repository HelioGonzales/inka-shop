import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice!: number;
  endSubs$!: Subscription;

  constructor(private cartSvc: CartService, private orderSvc: OrdersService) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary() {
    this.endSubs$ = this.cartSvc.cart$.subscribe((cart: Cart) => {
      this.totalPrice = 0;

      if (cart) {
        cart?.items?.map((item: any) => {
          this.orderSvc.getProduct(item?.productId).subscribe((product) => {
            this.totalPrice += product.price * item.quantity;
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs$.unsubscribe();
  }
}
