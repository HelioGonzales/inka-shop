import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$!: Subscription;

  constructor(private caregoriesSvc: CategoriesService) {}

  ngOnInit(): void {
    this.endSubs$ = this.caregoriesSvc
      .getCategories()
      .subscribe((res) => (this.categories = res));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs$.unsubscribe();
  }
}
