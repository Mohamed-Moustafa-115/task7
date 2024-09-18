import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'products', title: 'All Products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:id', title: 'product details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: 'search', title: 'product search', loadComponent: () => import('./search/search.component').then(m => m.SearchComponent) },
  { path: 'wishlist', title: 'wishlist', canActivate: [authGuard], loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'cart', title: 'cart', canActivate: [authGuard], loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'myReviews',
    children:[
      {path:"reviews", title: 'Reviews', canActivate: [authGuard], loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent)},
      {path:"updatereviews/:id", title: 'UpdateReviews', canActivate: [authGuard], loadComponent: () => import('./updatereviews/updatereviews.component').then(m => m.UpdatereviewsComponent)} 
    ] 
  },
  { path: 'myOrders', title: 'Orders', canActivate: [authGuard], loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'profile', title: 'Profile', canActivate: [authGuard], loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  
  {
    path: 'account', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'signup', title: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
      { path: 'login', title: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
      { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
    ]
  },
  { path: '**', component: NotFoundComponent }
];