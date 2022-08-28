import { CartService } from '@inka-shop/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inkashop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(cartSvc: CartService) {
    cartSvc.initCartLocalStorage();
  }

  ngOnInit(): void {}
}
