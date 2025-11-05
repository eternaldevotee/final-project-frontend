import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCardService } from '../../../core/services/dynamic-card.service';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { TravelPackageModel } from '../../../core/models/TravelPackageModel';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';

@Component({
  selector: 'app-card-detail',
  standalone: false,
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  package!: TravelPackageModel;

  constructor(
    private route: ActivatedRoute,
    private cardService: DynamicCardService,
    private routeBooking: Router,
    private customerLoginStateService: CustomerLoginStateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.cardService.getPackages().subscribe(packages => {
        this.package = packages.find((pkg: TravelPackageModel) => pkg.packageID === id)!;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    console.log(this.package);
  }

  onBookNow(): void {
    if (this.customerLoginStateService.isLoggedIn()) {
      this.routeBooking.navigate(['/booking', this.package.packageID]);
    } else {
      alert('Please log in to book!!');
    }
  }
}
