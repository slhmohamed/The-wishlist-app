import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
 
  title = 'Technical Test';
  isAuthenticated = false;
  constructor(private authService:AuthService,private router:Router){

 }
 
  ngOnInit(): void {
    if(localStorage.getItem('x-auth-token'))
   { this.isAuthenticated=true
    console.log(this.isAuthenticated);}
    
    
    
  }

  
   logout() {
     console.log("bb");
     
  this.authService.logout();
  this.router.navigate(['/']);
  }
}
 
