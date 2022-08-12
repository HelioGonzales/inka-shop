import { PopupService } from './../../../shared/service/popup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@inka-shop/orders';
import { ORDER_STATUS } from '../order.constant';
import swal from 'sweetalert2';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  currentRoute!: string;

  constructor(
    private ordersSvc: OrdersService,
    private router: Router,
    private popupSvc: PopupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  onDeleteOrder(orderId: string) {
    swal
      .fire({
        title: 'Are you sure to Delete the user?',
        text: 'You will not be able to recover the user',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ordersSvc.deleteOrder(orderId).subscribe(
            (res) => {
              swal.fire('Deleted!', 'Your order has been deleted.', 'success');
              this._getOrders();
            },
            (error) => {
              this.popupSvc.popupError(error.error.message);
            }
          );
        } else {
          return;
        }
      });
  }

  onShowOrder(orderId: string) {
    this.router.navigate([`/orders/${orderId}`]);
  }

  private _getOrders() {
    this.activatedRoute.url.subscribe((res) => {
      this.currentRoute = `${res[0].path}`;
    });
    this.ordersSvc.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }
}
