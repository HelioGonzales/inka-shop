import { Component, OnInit } from '@angular/core';
import { UsersService } from '@inka-shop/users';

@Component({
  selector: 'inkashop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private usersSvc: UsersService) {}

  ngOnInit(): void {
    this.usersSvc.initAppSession();
  }

  title = 'inka-shop';
}
