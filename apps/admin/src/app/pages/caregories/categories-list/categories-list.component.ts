import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoriesService } from '@inka-shop/products';
import { PopupService } from '../../../shared/service/popup.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs!: Subscription;

  constructor(
    private categoriesSvc: CategoriesService,
    private popupSvc: PopupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  onDeleteCategory(categoryId: string) {
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
          this.endSubs = this.categoriesSvc
            .deleteCategory(categoryId)
            .subscribe(
              (res) => {
                swal.fire(
                  'Deleted!',
                  'Your category has been deleted.',
                  'success'
                );
                this._getCategories();
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

  onUpdateCategory(categoryId: string) {
    this.router.navigate([`/categories/form/${categoryId}`]);
  }

  private _getCategories() {
    this.endSubs = this.categoriesSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.unsubscribe();
  }
}
