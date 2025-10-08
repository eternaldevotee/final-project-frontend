import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';
import { UserModel } from '../../../../core/models/UserModel';


@Component({
  selector: 'app-agent-login',
  standalone: false,
  templateUrl: './agent-login.component.html',
  styleUrl: './agent-login.component.css'
})
export class AgentLoginComponent {

  login!:UserModel;
  userExists!:boolean;  


  constructor(private restservice:AuthserviceService, private sharedataservice:ShareloginService, private router: Router){}


  ngOnInit(): void {
    this.login={
      userID:'',
      name:'',
      email:'',
      password:'',
      role:'',
      contactNumber:''
    }
  }
  onSubmit(AloginForm: NgForm) {
    const emailId = AloginForm.value.emailId;

    this.restservice.getUserByEmailId(emailId).subscribe({
      next:(data) =>{
      
        this.userExists=!!data;
        const role= data.role;
        if(this.userExists&&role=='agent'){
          const password = AloginForm.value.password;

          if(password === data.password){
            alert("Logged in successfully!!");
            this.sharedataservice.login(data.userID,data.role);
            this.router.navigate(['/agent']);
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
