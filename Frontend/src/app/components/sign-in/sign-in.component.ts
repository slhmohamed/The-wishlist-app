import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService
   
  ) {
    
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
     
  }

  
  login() {
    console.log("ok bb");
    
    if (this.authService._isLogged()) {
      this.router.navigate(['/Wishlist']);

    }
}

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    let currentUrl="/login"
    if (this.form.valid) {
      try {
        this.authService.login(this.form.value,currentUrl).subscribe(result=>{
          
  if (result) {


    this.login()
}
        })

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}