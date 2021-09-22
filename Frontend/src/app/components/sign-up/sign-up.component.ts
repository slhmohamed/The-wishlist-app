import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  
 

  constructor(
    private fb: FormBuilder,
 
    private userService:UserService,
 private router:Router
   
  ) {
    
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }
    onSubmit()  {
  
   
    if (this.form.valid) {
     
      
        let currentUrl="/register"
    
        
  this.userService.insertData(this.form.value,currentUrl).subscribe(result=>{
    this.router.navigate(['/']);
 
 
    
  });

  }
}}