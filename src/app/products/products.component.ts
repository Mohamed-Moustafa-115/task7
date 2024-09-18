import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DescriptionPipe, RouterLink,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  subscription: any;
  products: any[] = [];
  pagination: Pagination = {};
  imgDomain: string = '';
  search: string = '';
  sort:any=undefined;
  page: number = 1;
  prodSearch = new FormGroup(
    {
      searchBy: new FormControl(null, [ Validators.maxLength(100)]),
      searchValue: new FormControl(null, [ Validators.min(5)])
    }
  );

  constructor(private _ProductsService: ProductsService, private _CartService: CartService) { }

  enterSearchValue(){
    let val:any=document.getElementById("searchValue");
    this.search=val.value;
    this.searchProducts(this.search);
  }

  sortResults(){
    let val:any=document.getElementById("searchBy");
    this.sort=val.value;
    this.searchProducts(this.search,this.sort);
  }

  loadProducts() {
    this.subscription = this._ProductsService.getProducts(16, this.page, this.sort, this.search).subscribe((res) => {
      this.products = res.data;
      this.pagination = res.pagination
    })
  }

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
    if(this.search!==''){
      this.searchProducts(this.search,this.sort);
    }
    else{
    this.loadProducts();
    }
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
