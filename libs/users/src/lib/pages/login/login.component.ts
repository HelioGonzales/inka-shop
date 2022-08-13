import { LocalstorageService } from './../../services/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  authError = false;
  authMessage = '';

  constructor(
    private authSvc: AuthService,
    private localstorageSvc: LocalstorageService,
    private router: Router
  ) {
    this._initForm();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.form.valid) return;
    this.authSvc
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe(
        (res) => {
          this.authError = false;
          this.localstorageSvc.setToken(res.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the server please try again later';
          }
        }
      );
  }

  private _initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
