import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '@inka-shop/orders';
import { ProductsService } from '@inka-shop/products';
import { UsersService } from '@inka-shop/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  orders!: number;
  totalSales!: any;
  products!: number;
  users!: number;
  endSubs!: Subscription;

  constructor(
    private orderSvc: OrdersService,
    private productsSvc: ProductsService,
    private usersSvc: UsersService
  ) {}

  ngOnInit(): void {
    this._orders();
    this._products();
    this._users();
  }

  private _orders() {
    this.endSubs = this.orderSvc.getOrders().subscribe((res) => {
      const totalSales = res
        .map((pr) => pr.totalPrice)
        .reduce((a: any, b: any) => a + b);

      this.totalSales = totalSales;

      this.orders = res.length;
    });
  }

  private _products() {
    this.endSubs = this.productsSvc.getProducts().subscribe((res) => {
      this.products = res.length;
    });
  }

  private _users() {
    this.endSubs = this.usersSvc.getUsers().subscribe((res) => {
      this.users = res.length;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
