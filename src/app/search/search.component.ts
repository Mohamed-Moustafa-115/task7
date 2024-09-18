import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DescriptionPipe } from '../pipes/description.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pagination } from '../interfaces/pagination';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, DescriptionPipe, RouterLink,ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit,OnDestroy{
  subscription: any;
  products: any[] = [];
  pagination: Pagination = {};
  imgDomain: string = '';
  search: string = '';
  page: number = 1;
  prodSearch = new FormGroup(
    {
      searchBy: new FormControl(null, [ Validators.maxLength(100)]),
      searchValue: new FormControl(null, [ Validators.min(5)])
    }
  );

  constructor(private _ProductsService: ProductsService, private _CartService: CartService,private _ActivatedRoute: ActivatedRoute) { }

  searchProducts(value:string,sort:any=undefined) {
    this.subscription = this._ProductsService.getProducts(16, this.page,sort, value).subscribe((res) => {
      this.products = res.data;
      this.pagination = res.pagination
    })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => { alert('Product Added to cart') })
  }

  changePage(page: number) {
    this.page = page;
    this.searchProducts(this.search)
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.search=this._ActivatedRoute.snapshot.params['value'];
    this.searchProducts(this.search);
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
