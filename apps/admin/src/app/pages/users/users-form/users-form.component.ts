import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@inka-shop/users';
import { PopupService } from '../../../shared/service/popup.service';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  isSubmited = false;
  editMode = false;
  currentUserId: string = null as any;
  countries: any[] = [];

  constructor(
    private usersSvc: UsersService,
    private popupSvc: PopupService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this._getCountries();
  }

  onSubmit() {
    this.isSubmited = true;
    if (!this.form.valid) return;

    const user: User = {
      id: this.currentUserId,
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      phone: this.form.get('phone')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
      street: this.form.get('street')?.value,
      apartment: this.form.get('apartment')?.value,
      zip: this.form.get('zip')?.value,
      city: this.form.get('city')?.value,
      country: this.form.get('country')?.value,
    };

    if (this.editMode) {
      this._onUpdateUser(user);
    } else {
      this._onAddUser(user);
    }
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id) {
        this.editMode = true;
        this.currentUserId = res.id;
        this.usersSvc.getUser(res.id).subscribe((res) => {
          this.form.get('name')?.setValue(res.name);
          this.form.get('email')?.setValue(res.email);
          this.form.get('password')?.setValue(res.password);
          this.form.get('phone')?.setValue(res.phone);
          this.form.get('isAdmin')?.setValue(res.isAdmin);
          this.form.get('street')?.setValue(res.street);
          this.form.get('apartment')?.setValue(res.apartment);
          this.form.get('zip')?.setValue(res.zip);
          this.form.get('city')?.setValue(res.city);
          this.form.get('country')?.setValue(res.country);
          this.form.get('password')?.setValidators([]);
          this.form.get('password')?.updateValueAndValidity();
        });
      }
    });
  }

  private _onAddUser(user: User) {
    this.usersSvc.createUser(user).subscribe(
      (user: User) => {
        this.form.reset();
        this.popupSvc.popup('/users', `${user.name} created`);
      },
      (error) => {
        this.form.reset();
        this.popupSvc.popupError(error.error.message);
      }
    );
  }

  private _onUpdateUser(user: User) {
    this.usersSvc.updateUser(user).subscribe(
      (user: User) => {
        this.form.reset();
        this.popupSvc.popup('/users', `${user.name} updated`);
      },
      (error) => {
        this.form.reset();
        this.popupSvc.popupError(error.error.message);
      }
    );
  }

  private _initUserForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      isAdmin: new FormControl(false),
      street: new FormControl(''),
      apartment: new FormControl(''),
      zip: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
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
