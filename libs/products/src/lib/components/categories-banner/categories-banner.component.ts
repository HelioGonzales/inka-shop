import { Subscription } from 'rxjs';
import { CategoriesService } from '@inka-shop/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$!: Subscription;

  constructor(private categoriesSvc: CategoriesService) {}

  ngOnInit(): void {
    this.endSubs$ = this.categoriesSvc.getCategories().subscribe((res) => {
      console.log(res);

      this.categories = res;
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.unsubscribe();
  }
}
