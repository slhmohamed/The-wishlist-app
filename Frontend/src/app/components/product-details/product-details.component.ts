import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: any
  wishlists: any;
  formProduct: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private authService: AuthService,
    private wishlistService: WishlistService,
  ) {

    this.formProduct = this.fb.group({
      wishlistID: ['', Validators.required],
      status: ['', Validators.required],

    });

  }

  ngOnInit(): void {

    
    this.getCurrentProduct()
    this.getAllWishlist()

    this.formProduct.setValue({
      wishlistID:this.product.wishlistID,
      status:this.product.status
    })
  }
  submit(){
    this.id = this.route.snapshot.paramMap.get('id');
let currentUrl="/updateProduct/"
this.productService.updateData(this.formProduct.value, this.id ,currentUrl).subscribe()
    
  }
  getCurrentProduct() {
    this.id = this.route.snapshot.paramMap.get('id');

    let curruntUrl = "/getProductById/"
    this.productService.getById(this.id, curruntUrl).subscribe(result => {
      this.product = result
      console.log(this.product);
    })
  }
  getAllWishlist() {
    let curentUrl = "/getAll/"
    let id = this.authService.getCurrentUser()._id;
    this.wishlistService.getById(id, curentUrl).subscribe(result => {
      this.wishlists = result
      console.log(this.wishlists);

    });

  }
  deleteProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    let currentUrl = "/deleteProduct/"

    this.productService.deleteData(this.id, currentUrl).subscribe()
    this.router.navigate(['/product']);
  }

}
