import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,ReactiveFormsModule,DatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  isActive:boolean=true;
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })
  constructor(private _AuthService: AuthService, private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService,private _ReviewService:ReviewsService) { }
  ngOnInit(): void {
    this._AuthService.checkToken()
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService.getProduct(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  disable():string{
    if(this.isActive===true){
      this.isActive=false;
      return 'active';
    }
    else{
      return '';
    }
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe((res) => { alert('Product Added to wishlist') })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => {alert('Product Added to cart') })
  }

  loadProduct() {
    this.subscription = this._ProductsService.getProduct(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  addReview(productId: string, formData: FormGroup) {
    this._ReviewService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        this.loadProduct();
        alert('Review Added')
      },
      error: (err) => {
        if (err.error.errors) {
          err.error.errors.map((error: any) => {
            if (error.path === 'product') { this.reviewError = error.msg }
          })
        }
        else {
          this.reviewError = `login first to add review`;
        }
      }
    })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
