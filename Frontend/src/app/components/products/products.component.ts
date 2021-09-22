import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddWishlistComponent } from '../add-wishlist/add-wishlist.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  id: any;
 
  constructor(  private dialog: MatDialog,
    private productService:ProductService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getcurrentProduct();

  }
 

getcurrentProduct(){
  let curentUrl="/productByPosterId/"
  this.id=this.authService.getCurrentUser()._id;
  this.productService.getById(this.id,curentUrl).subscribe(result=>{
 
  this.products=result
  });

}
onCreate() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "  70%"
  const dialogRef =this.dialog.open(AddProductComponent, dialogConfig);
 
dialogRef.afterClosed()
.subscribe((response: any[]) => {
 if (!response) {
   return;
 }
 console.log(response[0]) 
 console.log(response[1]) 
 this.getcurrentProduct();
});

}
}
