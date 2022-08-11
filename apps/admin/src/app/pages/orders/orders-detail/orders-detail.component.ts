import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@inka-shop/orders';
import { ORDER_STATUS } from '../order.constant';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  editMode = false;
  order!: Order;
  orderStatuses: any[] = [];
  selectedStatus: any;

  constructor(
    private orderSvc: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  onChangeStatus(event: any) {
    console.log(event);
  }

  private _getOrder() {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.orderSvc.getOrder(params.id).subscribe((res) => {
          this.order = res;
        });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
}
