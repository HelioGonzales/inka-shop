import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@inka-shop/orders';
import { ORDER_STATUS } from '../order.constant';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(private ordersSvc: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }

  onDeleteOrder(orderId: string) {}

  onShowOrder(orderId: string) {
    this.router.navigate([`/orders/${orderId}`]);
  }

  private _getOrders() {
    this.ordersSvc.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }
}
