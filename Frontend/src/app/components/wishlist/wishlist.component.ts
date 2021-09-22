import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { WishlistService } from 'src/app/service/wishlist.service';
 
import { AddWishlistComponent } from '../add-wishlist/add-wishlist.component';
 
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlists:any;
  id: any;
  constructor(  private dialog: MatDialog,
    private wishlistService:WishlistService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.id=this.authService.getCurrentUser()._id;
    
    this.getAllWishlistByPosterId();
  }
go(id:string){
  console.log(id);
  
}

getAllWishlistByPosterId(){
  let curentUrl="/getAll/"
  this.wishlistService.getById(this.id,curentUrl).subscribe(result=>{
 
    this.wishlists=result
    
    
  });

}
onCreate() {
  const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose=true;
  //dialogConfig.autoFocus=true;
  dialogConfig.width = "  40%"


  const dialogRef =this.dialog.open(AddWishlistComponent, dialogConfig);
//after close
dialogRef.afterClosed()
.subscribe((response: any[]) => {
 if (!response) {
   return;
 }
 console.log(response[0]) // action
 console.log(response[1]) // data
 this.getAllWishlistByPosterId();
  
 
});

}
}
