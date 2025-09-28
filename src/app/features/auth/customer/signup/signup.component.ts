import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../../core/models/UserModel';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUp! :UserModel;
  signupForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    emailId: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    conPassword:new FormControl('',[Validators.required])
  })

  get name(){
    return this.signupForm.get('name');
  }

  get emailId(){
    return this.signupForm.get('emailId');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get conPassword(){
    return this.signupForm.get('conPassword');
  }

  constructor(private restservice: AuthserviceService, private router: Router){}

  onSubmit(){
    const conpassword = this.signupForm.get('conPassword')?.value;
    const password = this.signupForm.get('password')?.value;

    this.signUp={
      UserId:crypto.randomUUID(),
      Name:this.signupForm.get('name')?.value??'',
      Email:this.signupForm.get('emailId')?.value??'',
      Password:this.signupForm.get('password')?.value??'',
      Role:"customer",
      ContactNumber:""
    }
    if(password!=conpassword){
      alert("Password not matching with confirm password!!")
    }else{
      this.restservice.setUserDetails(this.signUp).subscribe({
        next:() => {
          alert("Account created successfully!");
          this.router.navigate(['/login']);
        },

        error: (err) => {
          console.error(err);
          alert(err);
        }

      })
    }
  }
}