import { Component } from '@angular/core';
import { SearchserviceService } from './Services/searchservice.service';
import { ShareloginService } from './Services/sharelogin.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travel-package-booking-system';
}
