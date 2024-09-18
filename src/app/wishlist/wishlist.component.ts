import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from './../services/auth.service';
import { GlobalService } from '../services/global.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  subscription: any;
  wishlist: any[] = [];
  wishlistLength: number = 0;
  productImage: string = ''
  constructor(private _AuthService: AuthService, private _wishlistService: WishlistService,
    private _GlobalService: GlobalService, private _CartService: CartService) { }


  loadWishlist() {
    this.subscription = this._wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data
        this.wishlistLength = res.length
      }, error: (err) => { }
    })
  }

  removeFromWishlist(itemId: string) {
    this._wishlistService.removeProductFromWishlist(itemId).subscribe({
      next: (res) => {
        this.loadWishlist();
        alert('product removed from wishlist')
      }, error: (err) => { }
    })
  }

  addToCart(itemId: string) {
    this._CartService.addProductToCart(itemId).subscribe({
      next: (res) => {
        alert('product Added to cart')
      }, error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadWishlist();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
