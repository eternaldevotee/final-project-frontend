import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-agent-control',
  standalone: false,

  templateUrl: './agent-control.component.html',
  styleUrl: './agent-control.component.css'
})
export class AgentControlComponent {

  showToast(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: 'info',
      title: message
    });
  }
}
