import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
 
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.css']
})
export class WishlistDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'picture','name', 'description', 'status','price'];
  wishlistToBuy: MatTableDataSource<any> = new MatTableDataSource<any>();
  wishlistBought: MatTableDataSource<any> = new MatTableDataSource<any>();;

  wishlistsBought:any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  wishlist: any;
 
  wishlistsToBuy:any
  id: any
  constructor(private route: ActivatedRoute,
    private router: Router,
    private wishlistService: WishlistService) { }


  ngAfterViewInit() {
    this.wishlistToBuy.paginator = this.paginator;
    this.wishlistBought.paginator = this.paginator;
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    let url = "/wishlistDetails/"
    this.wishlistService.getById(this.id, url).subscribe(data => {
      this.wishlist = data
     

    })
this.getWishlistToBuy()
this.getWishlistBought()


  }

  deleteWishlist() {
    let currentUrl="/deleteWishlist/"
   this.wishlistService.deleteData(this.id,currentUrl).subscribe()
    this.router.navigate(['/Wishlist']);
  


  }


  getWishlistToBuy(){
    let currentUrl="/wishlistToBuy/"
 this.wishlistService.getById(this.id,currentUrl).subscribe(result=>{
   this.wishlistsToBuy=result
 
   
  this.wishlistToBuy = new MatTableDataSource<any>( this.wishlistsToBuy);
 
  
  this.wishlistToBuy.sort = this.sort;

  setTimeout(() => {
    this.wishlistToBuy.paginator = this.paginator;
  }, 0);
})
  }


  getWishlistBought(){
    let currentUrl="/wishlistBought/"
 this.wishlistService.getById(this.id,currentUrl).subscribe(result=>{
   this.wishlistsBought=result
   console.log(this.wishlistsBought);
   
  this.wishlistBought = new MatTableDataSource<any>( this.wishlistsBought);
 
  
  this.wishlistBought.sort = this.sort;

  setTimeout(() => {
    this.wishlistBought.paginator = this.paginator;
  }, 0);
})
  }
}
