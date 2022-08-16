import { PopupService } from './../../../shared/service/popup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@inka-shop/orders';
import { ORDER_STATUS } from '../order.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  editMode = false;
  order!: Order;
  orderStatuses: any[] = [];
  selectedStatus: any;
  currentRoute!: string;
  endSubs!: Subscription;

  constructor(
    private orderSvc: OrdersService,
    private activatedRoute: ActivatedRoute,
    private popupSvc: PopupService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  onChangeStatus(event: any) {
    this.endSubs = this.orderSvc
      .updateOrder({ status: event.target.value }, this.order.id)
      .subscribe((res) => {
        this.popupSvc.popup(
          `status was changed ${event.target.value}`,
          this.currentRoute
        );
      });
  }

  private _getOrder() {
    this.endSubs = this.activatedRoute.url.subscribe((res) => {
      this.currentRoute = `${res[0].path}/${res[1].path}`;
    });

    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.orderSvc.getOrder(params.id).subscribe((res) => {
          this.order = res;
          this.selectedStatus = this.order.status;
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
