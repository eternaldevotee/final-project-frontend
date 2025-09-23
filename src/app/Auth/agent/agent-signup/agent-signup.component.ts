import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-signup',
  standalone: false,
  templateUrl: './agent-signup.component.html',
  styleUrl: './agent-signup.component.css'
})
export class AgentSignupComponent {
signup! : FormGroup;
 
  constructor(private fb : FormBuilder){
    this.signup = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      email : ['', [Validators.required, Validators.email]],
      number : ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
      password: this.fb.group({
        pwd: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)] ],
        cpwd: ['', [Validators.required, Validators.minLength(8)]]
      }, { validators: this.equalPassword }),
      });
  }

  get name(){
    return this.signup.get(['name']);
  }
  
  get email(){
    return this.signup.get(['email']);
  }

  get number(){
    return this.signup.get(['number']);
  }

  get password(){
    return this.signup.get(['password'])
  }

  get pwd(){
    return this.password?.get(['pwd']);
  }

  get cpwd(){
    return this.password?.get(['cpwd']);
  }
  
 
  equalPassword (control : AbstractControl) : ValidationErrors | null
  {

    const pwd = control.get('pwd')?.value;
    const cpwd = control.get('cpwd')?.value;

    return pwd ===cpwd ? null : { differentPwd: true };
  }
  

  onSubmit() {

}

}
