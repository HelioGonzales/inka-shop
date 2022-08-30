import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@inka-shop/orders';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { PopupProdService } from '../../services/popup-prod.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity = 1;
  endSubs$!: Subscription;

  constructor(
    private productsSvc: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartSvc: CartService,
    private popupProdSvc: PopupProdService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id) {
        this._getProduct(res.id);
      }
    });
  }

  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };

    this.cartSvc.setCartItem(cartItem);
    this.popupProdSvc.popup('Added to cart');
  }

  private _getProduct(id: string) {
    this.endSubs$ = this.productsSvc.getProduct(id).subscribe((res) => {
      this.product = res;
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.unsubscribe();
  }
}
