import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';
 
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { WishlistDetailsComponent } from './components/wishlist-details/wishlist-details.component';
import { AddWishlistComponent } from './components/add-wishlist/add-wishlist.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AppHttpInterceptorService } from './service/app-http-interceptor.service';
import { AuthGuard } from './service/auth-guard.service';
const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Wishlist', component: WishlistComponent,  canActivate: [AuthGuard] },
  { path: 'product', component: ProductsComponent ,  canActivate: [AuthGuard]},
  {path: 'wishlist-details/:id',component:WishlistDetailsComponent ,  canActivate: [AuthGuard] }, 
  {path: 'product-details/:id',component:ProductDetailsComponent ,  canActivate: [AuthGuard] }, 
   
];
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavBarComponent,
    WishlistComponent,
    AddProductComponent,
    WishlistDetailsComponent,
    AddWishlistComponent,
    ProductsComponent,
    ProductDetailsComponent
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
    MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatTabsModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSortModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatDialogModule
  ],
  entryComponents:[AddWishlistComponent,
    AddProductComponent],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptorService,
    multi: true},],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
