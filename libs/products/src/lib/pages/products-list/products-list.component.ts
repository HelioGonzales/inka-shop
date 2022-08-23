import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage!: boolean;

  constructor(
    private productsSvc: ProductsService,
    private categoriesSvc: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      res.id ? this._getProducts([res.id]) : this._getProducts();
      res.id ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((res) => res.checked)
      .map((res) => res.id);
    this._getProducts(selectedCategories);
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsSvc.getProducts(categoriesFilter).subscribe((res) => {
      this.products = res;
    });
  }

  private _getCategories() {
    this.categoriesSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}
