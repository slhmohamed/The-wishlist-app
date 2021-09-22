import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { WishlistService } from 'src/app/service/wishlist.service';
 
@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.css']
})
export class AddWishlistComponent implements OnInit {
  posterId:any;
  form: FormGroup;
  posterid: any;
  constructor( private fb: FormBuilder,
    private authService:AuthService,
    private wishlistService:WishlistService,
   
    @Inject(MAT_DIALOG_DATA) public data:any,
     private matDialogRef:MatDialogRef<AddWishlistComponent>,) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
     
    });
  }

  ngOnInit(): void {
     this.posterid=this.authService.getCurrentUser()._id;
     console.log(this.posterid);
     
    
  }
 
 
  submit(){
    if (this.form.valid) {
      let newWishlist={
        posterId: this.posterid,
        name:this.form.value.name
      }
      try {
        let currentUrl="/addWishlist"
        this.wishlistService.insertData(newWishlist,currentUrl).subscribe();
        this.closeDialog();
        


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
