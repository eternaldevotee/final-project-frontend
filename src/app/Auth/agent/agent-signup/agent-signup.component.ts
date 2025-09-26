import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../Services/authservice.service';

@Component({
  selector: 'app-agent-signup',
  standalone: false,
  templateUrl: './agent-signup.component.html',
  styleUrl: './agent-signup.component.css'
})
export class AgentSignupComponent {
// signup! : FormGroup;
 
//   constructor(private fb : FormBuilder){
//     this.signup = this.fb.group({
//       name : ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]],
//       email : ['', [Validators.required, Validators.email]],
//       number : ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
//       password: this.fb.group({
//         pwd: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)] ],
//         cpwd: ['', [Validators.required, Validators.minLength(8)]]
//       }, { validators: this.equalPassword }),
//       });
//   }

//   get name(){
//     return this.signup.get(['name']);
//   }
  
//   get email(){
//     return this.signup.get(['email']);
//   }

//   get number(){
//     return this.signup.get(['number']);
//   }

//   get password(){
//     return this.signup.get(['password'])
//   }

//   get pwd(){
//     return this.password?.get(['pwd']);
//   }

//   get cpwd(){
//     return this.password?.get(['cpwd']);
//   }
  
 
//   equalPassword (control : AbstractControl) : ValidationErrors | null
//   {

//     const pwd = control.get('pwd')?.value;
//     const cpwd = control.get('cpwd')?.value;

//     return pwd ===cpwd ? null : { differentPwd: true };
//   }
  

//   onSubmit() {

// }

// }
  Asignup!:SignUp;
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
      UserId:"1234",
      Name:this.AsignupForm.get('name')?.value??'',
      Email:this.AsignupForm.get('emailId')?.value??'',
      Password:this.AsignupForm.get('password')?.value??'',
      Role:"Agent",
      ContactNumber:this.AsignupForm.get('cnumber')?.value??'',
    }
    if(password!=conpassword){
      alert("Password not matching with confirm password!!")
    }else{
      this.restservice.setCustomerDetails(this.Asignup).subscribe(data =>{

        alert("Account created successfully!");
      })
    }
  }
}

export class SignUp{
  UserId!:string;
  Name!:string;
  Email!:string;
  Password!:string;
  Role!:string;
  ContactNumber!:string;
}