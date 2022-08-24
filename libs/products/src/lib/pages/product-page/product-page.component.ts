import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity = 0;
  endSubs$!: Subscription;

  constructor(
    private productsSvc: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id) {
        this._getProduct(res.id);
      }
    });
  }

  addToCart() {}

  private _getProduct(id: string) {
    this.endSubs$ = this.productsSvc.getProduct(id).subscribe((res) => {
      this.product = res;
      console.log(this.product);
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.unsubscribe();
  }
}
