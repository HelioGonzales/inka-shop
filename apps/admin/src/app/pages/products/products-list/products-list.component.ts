import { Product } from './../../../../../../../libs/products/src/lib/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@inka-shop/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productSvc: ProductsService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  onDeleteCategory(productId: string) {}

  onUpdateCategory(productId: string) {}

  private _getProducts() {
    this.productSvc.getProducts().subscribe((res) => (this.products = res));
  }
}
