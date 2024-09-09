import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  hostName: string = '';
  routeName: string = '';
  productsRoute: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.reviewsRoute;
    this.productsRoute = this._GlobalService.productsRoute;
  }

  addReview(productId: string, formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.productsRoute}/${productId}/reviews`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  getUserReviews(limit: number = 50, page: number = 1, sort: '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/myReviews?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  updateUserReview(reviewId: string, formData: any) {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/${reviewId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }

  deleteUserReview(reviewId: string) {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${reviewId}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
