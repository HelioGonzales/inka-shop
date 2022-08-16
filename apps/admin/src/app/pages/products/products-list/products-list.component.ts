import { PopupService } from './../../../shared/service/popup.service';
import { Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, ProductsService } from '@inka-shop/products';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubs!: Subscription;

  constructor(
    private productSvc: ProductsService,
    private router: Router,
    private popupSvc: PopupService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  onDeleteProduct(productId: string) {
    swal
      .fire({
        title: 'Are you sure to Delete the category?',
        text: 'You will not be able to recover the category',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.endSubs = this.productSvc.deleteProduct(productId).subscribe(
            (res) => {
              swal.fire(
                'Deleted!',
                'Your category has been deleted.',
                'success'
              );
              this._getProducts();
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

  onUpdateProduct(productId: string) {
    this.router.navigate([`products/form/${productId}`]);
  }

  private _getProducts() {
    this.endSubs = this.productSvc
      .getProducts()
      .subscribe((res) => (this.products = res));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
