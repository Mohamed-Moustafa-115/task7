import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private hostName: string = ''
  private routeName: string = ''
  productImages: string = ``
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.productsRoute;
    this.productImages = this._GlobalService.productsImages;
  }

  getProducts(limit: number = 16, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getOneProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${id}`)
  }
  
}
