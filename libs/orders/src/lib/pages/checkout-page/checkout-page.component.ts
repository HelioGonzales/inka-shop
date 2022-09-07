import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as countriesLib from 'i18n-iso-countries';
import { Cart } from '../../models/cart.model';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { ORDER_STATUS } from '../../order.constant';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  orderItems: OrderItem[] | undefined = undefined;
  countries: any[] = [];
  userId = '6317a959d0d6a2bb6af149b6';

  constructor(
    private router: Router,
    private cartSvc: CartService,
    private ordersSvc: OrdersService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.form?.get('street')?.value,
      shippingAddress2: this.form?.get('apartment')?.value,
      city: this.form?.get('city')?.value,
      zip: this.form?.get('zip')?.value,
      country: this.form?.get('country')?.value,
      phone: this.form?.get('phone')?.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.ordersSvc.createOrder(order).subscribe(
      () => {
        // redirect to thank you page // payment page
        this.cartSvc.empyCart();
        this.router.navigate(['/success']);
      },
      () => {
        // Display some message to user
      }
    );
  }

  private _initCheckoutForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      street: new FormControl(null, Validators.required),
      apartment: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    });
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
    // { 'AF': 'Afghanistan', 'AL': 'Albania', [...], 'ZM': 'Zambia', 'ZW': 'Zimbabwe' }
  }

  private _getCartItems() {
    const cart: Cart = this.cartSvc.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }
}
