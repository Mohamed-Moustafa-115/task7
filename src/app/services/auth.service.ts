import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup, Login } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hostName: string = '';
  routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.authRoute;
    if (localStorage.getItem('user') !== null) {
      this.saveCurrentUser()
    }
  }
  currentUser = new BehaviorSubject(null);
  authPhoto: string = 'images/phone.svg'

  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
      this._Router.navigate(['/home'])
    }
  }

  singUp(formData: Signup): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, formData)
  }

  login(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/login`, formData)
  }

  sendMail(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/forgetPassword`, formData)
  }

  verifyCode(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/verifyCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }

  resetPassword(formData: Login): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/resetCode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } })
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
