import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { Pagination } from '../interfaces/pagination';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  subscription: any;
  reviews: any[] = [];
  reviewsLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = ''
  productImage: string = '';

  constructor(private _AuthService: AuthService, private _ReviewsService: ReviewsService, private _GlobalService: GlobalService) { }

  loadReviews() {
    this.subscription = this._ReviewsService.getUserReviews(undefined, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination;
        this.reviewsLength = res.length;
      }
    })
  }

  deleteReview(reviewId: string) {
    this._ReviewsService.deleteUserReview(reviewId).subscribe({
      next: (res) => {
        this.loadReviews();
        alert('Review deleted successfully');
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadReviews();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
