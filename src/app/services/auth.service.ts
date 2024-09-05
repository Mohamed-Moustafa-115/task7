import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup, Login } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  currentUser = new BehaviorSubject(null);
  authPhoto: string = 'images/door-open.svg'

  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }

  singUp(formData: Signup): Observable<any> {
    return this._HttpClient.post('http://localhost:3300/api/v1/auth/signup', formData)
  }

  login(formData: Login): Observable<any> {
    return this._HttpClient.post('http://localhost:3300/api/v1/auth/login', formData)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
