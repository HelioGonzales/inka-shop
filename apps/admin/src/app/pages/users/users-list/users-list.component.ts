import { UsersService } from '@inka-shop/users';
import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../../shared/service/popup.service';
import { Router } from '@angular/router';
import { User } from 'libs/users/src/lib/models/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersSvc: UsersService,
    private popupSvc: PopupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  onDeleteUser(userId: string) {
    swal
      .fire({
        title: 'Are you sure to Delete the user?',
        text: 'You will not be able to recover the user',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usersSvc.deleteUser(userId).subscribe(
            (res) => {
              swal.fire('Deleted!', 'Your user has been deleted.', 'success');
              this._getUsers();
            },
            (error) => {
              this.popupSvc.popupError(error.error.message);
            }
          );
        } else {
          return;
        }
      });
  }

  onUpdateUser(userId: string) {
    this.router.navigate([`/users/form/${userId}`]);
  }

  private _getUsers() {
    this.usersSvc.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
