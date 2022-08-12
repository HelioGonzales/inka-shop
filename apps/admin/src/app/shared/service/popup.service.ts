import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private router: Router) {}

  popup(title: string, routeToGo: string) {
    swal
      .fire({
        title: title,
        confirmButtonColor: 'var(--bs-blue)',
      })
      .then(() => {
        this.router.navigate([routeToGo]);
      });
  }

  popupError(errorMsg: string, routeToGo?: string) {
    swal
      .fire({
        title: `${errorMsg}`,
        confirmButtonColor: 'var(--bs-danger)',
      })
      .then(() => {
        this.router.navigate([routeToGo]);
      });
  }
}
