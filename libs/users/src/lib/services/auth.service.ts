import { LocalstorageService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL + 'users';

  constructor(
    private http: HttpClient,
    private localstorageSVC: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/login`, { email, password });
  }

  logout() {
    this.localstorageSVC.remoToken();
    this.router.navigate(['/login']);
  }
}
