import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-updatereviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updatereviews.component.html',
  styleUrl: './updatereviews.component.scss'
})
export class UpdatereviewsComponent implements OnInit,OnDestroy {
  subscription: any;
  id: string = '';
  reviewError: string = '';
  review:string=''
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })

  constructor(private _ActivatedRoute: ActivatedRoute, private _ReviewsService: ReviewsService,
    private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) { }


    updateReview(reviewtId: string, formData: FormGroup) {
      this._ReviewsService.updateUserReview(reviewtId, formData.value).subscribe({
        next: (res) => {
          alert('Review Updated')
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
    }
  
    ngOnDestroy(): void { this.id; }

}
