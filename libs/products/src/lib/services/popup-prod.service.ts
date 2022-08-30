import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopupProdService {
  constructor() {}

  popup(title: string) {
    swal.fire({
      title: title,
      confirmButtonColor: 'var(--bs-blue)',
    });
  }
}
