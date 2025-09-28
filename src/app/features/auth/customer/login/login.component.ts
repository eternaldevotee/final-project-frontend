import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/sharelogin.service';
import { UserModel } from '../../../../core/models/UserModel';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login!:UserModel;
  userExists!:boolean;  


  constructor(private restservice:AuthserviceService, private sharedataservice:ShareloginService, private router: Router){}

  ngOnInit(): void {
    this.login={
      UserId:'',
      Name:'',
      Email:'',
      Password:'',
      Role:'',
      ContactNumber:''
    }
  }

  onSubmit(loginForm: NgForm) {

    const emailId = loginForm.value.emailId;

    this.restservice.getUserByEmailId(emailId).subscribe({
      next: (data) =>{ 
        
        this.userExists=!!data;
        console.log("The user exists:" + this.userExists)

        if(this.userExists && data.Role == "customer"){
          const password = loginForm.value.password;
        
          if(password === data.Password){
            alert("Logged in successfully!!");
            const userId=data.UserId;

            this.sharedataservice.login(userId);
            this.router.navigate(['']);
          }
          else
            alert("Incorrect password!!")
        }else{
          alert("Email not registered!!");
         }
      },

      error: (err) => {
        alert(err);
      }
    })
  }
}

