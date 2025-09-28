import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { UserModel } from '../../../../core/models/UserModel';


@Component({
  selector: 'app-agent-signup',
  standalone: false,
  templateUrl: './agent-signup.component.html',
  styleUrl: './agent-signup.component.css'
})
export class AgentSignupComponent {

  Asignup!:UserModel;
  AsignupForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]),
    emailId: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    conPassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
    cnumber:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{10}$/)])
  })
number: any;

  get name(){
    return this.AsignupForm.get('name');
  }

  get emailId(){
    return this.AsignupForm.get('emailId');
  }

  get password(){
    return this.AsignupForm.get('password');
  }

  get conPassword(){
    return this.AsignupForm.get('conPassword');
  }

  get cnumber(){
    return this.AsignupForm.get('cnumber');
  }

  constructor(private restservice: AuthserviceService){}

  onSubmit(){
    const conpassword = this.AsignupForm.get('conPassword')?.value;
    const password = this.AsignupForm.get('password')?.value;
    console.log(conpassword +" " +password)
    const signUp={
      UserId:crypto.randomUUID(),
      Name:this.AsignupForm.get('name')?.value??'',
      Email:this.AsignupForm.get('emailId')?.value??'',
      Password:this.AsignupForm.get('password')?.value??'',
      Role:"agent",
      ContactNumber:this.AsignupForm.get('cnumber')?.value??'',
    }
    if(password!=conpassword){
      alert("Password not matching with confirm password!!")
    }else{
      this.restservice.setUserDetails(signUp).subscribe(data =>{
        alert("Account created successfully!");
      })
    }
  }
}

