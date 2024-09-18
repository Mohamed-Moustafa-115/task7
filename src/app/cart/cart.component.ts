import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: any;
  cart: any = {};
  productsLength: number = 0;
  productImage: string = ''
  taxPrice: number = 100;
  couponError: string = '';
  couponForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })
  constructor(private _AuthService: AuthService, private _GlobalService: GlobalService, private _cartService: CartService,
    private _OrdersService: OrdersService, private _Router: Router) { }

  loadCart() {
    this.subscription = this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.productsLength = res.length
      }, error: (err) => { }
    })
  }

  removeItem(itemId: string) {
    this._cartService.removeProductFromCart(itemId).subscribe({
      next: (res) => {
        this.loadCart();
        alert('product removed from cart')
      }, error: (err) => { }
    })
  }

  addCoupon(formData: FormGroup) {
    this._cartService.applyCoupon(formData.value).subscribe({
      next: (res) => { this.loadCart() },
      error: (err) => { this.couponError = err.error.message }
    })
  }

  clearCart() {
    this._cartService.clearCart().subscribe({
      next: (res) => {
        alert('cart cleared')
        this._Router.navigate(['/home'])
      }, error: (err) => { },
    })
  }

  createOrder() {
    this._OrdersService.createOrder().subscribe({
      next: (res) => {
        alert('order created');
        this._Router.navigate(['/myOrders']);
      }, error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadCart();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
