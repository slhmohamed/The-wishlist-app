import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  file:any ;
  formProduct: FormGroup;
  wishlists: any;
  posterid: any;
 
  constructor( private fb: FormBuilder,
    private authService:AuthService,
    private productService:ProductService,
    private wishlistService:WishlistService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private matDialogRef:MatDialogRef<AddProductComponent>,) {

    this.formProduct = this.fb.group({
    
      name:  ['', Validators.required],
      price:['', Validators.required],
      curency:['', Validators.required],
      description:['', Validators.required],
      picture:['', Validators.required],
      wishlistID:['', Validators.required],
      status:['', Validators.required],
     
    });
   }
   selectPicture(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
  
      
    }
  }

  ngOnInit(): void {
    this.getAllWishlist();
    this.posterid=this.authService.getCurrentUser()._id;
    console.log(this.posterid);
    
  
     
    
  }
  
  getAllWishlist(){
    let curentUrl="/getAll/"
 let id=this.authService.getCurrentUser()._id;
 
 
    
 
    this.wishlistService.getById(id,curentUrl).subscribe(result=>{
   
      this.wishlists=result
      console.log(this.wishlists);
      
    });
  
  }
  onSubmit(){
    
    if (this.formProduct.valid) {
      
   const formData = new FormData();
      formData.append('name',this.formProduct.value.name);
      formData.append('price',this.formProduct.value.price);
      formData.append('curency',this.formProduct.value.curency);
      formData.append('description',this.formProduct.value.description);
      formData.append('wishlistID',this.formProduct.value.wishlistID);
      formData.append('status',this.formProduct.value.status);
      formData.append('posterId',this.posterid);
  
      formData.append('fichier', this.file);
      try{
      let currentUrl="/addProduct"
  this.productService.insertData(formData,currentUrl).subscribe()
  this.closeDialog()
}

  catch(err){
    console.log(err);
  }
}
}
  
    

  

  
  closeDialog(){
    this.matDialogRef.close( ['action', this.data]);
  }
}
