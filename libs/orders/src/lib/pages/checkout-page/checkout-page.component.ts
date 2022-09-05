import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { OrderItem } from '../../models/order-item.model';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  orderItems: OrderItem[] = [];
  countries: any[] = [];
  userId!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    if (this.form.invalid) {
      return;
    }
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
}
