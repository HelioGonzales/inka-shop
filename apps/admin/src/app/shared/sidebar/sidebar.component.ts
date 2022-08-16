import { Component, OnInit } from '@angular/core';
import { AuthService } from '@inka-shop/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private authSVC: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authSVC.logout();
  }
}
