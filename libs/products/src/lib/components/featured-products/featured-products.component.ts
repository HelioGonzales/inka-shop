import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubs$!: Subscription;

  constructor(private productSvc: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.unsubscribe();
  }

  private _getFeaturedProducts() {
    this.endSubs$ = this.productSvc.getFeaturedProducts(4).subscribe((res) => {
      this.products = res;
    });
  }
}
