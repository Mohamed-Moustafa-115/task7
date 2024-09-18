import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })
  constructor(private _ActivatedRoute: ActivatedRoute, private _ReviewsService: ReviewsService,
    private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) { }

  loadProduct() {
    this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe((res) => { alert('Product Added to wishlist') })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => { alert('Product Added to cart') })
  }

  addReview(productId: string, formData: FormGroup) {
    this._ReviewsService.addReview(productId, formData.value).subscribe({
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

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgDomain = this._ProductsService.productImages;
    this.loadProduct()
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
