import { PopupService } from './../../../shared/service/popup.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@inka-shop/orders';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  currentRoute!: string;
  endSubs!: Subscription;

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
          this.endSubs = this.ordersSvc.deleteOrder(orderId).subscribe(
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
    this.endSubs = this.ordersSvc.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
