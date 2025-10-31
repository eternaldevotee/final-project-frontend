import { Component } from '@angular/core';
import { DynamicCardService } from '../../core/services/dynamic-card.service';
import { TravelPackageModel } from '../../core/models/TravelPackageModel';
import { ShareloginService } from '../../core/services/loginstate/sharelogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-packages',
  standalone: false,
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packages!: TravelPackageModel[];

  constructor(private cardService : DynamicCardService, private shareLoginService : ShareloginService , private router : Router){}

  ngOnInit() : void {
    const adminID = this.shareLoginService.getUserId();
    // const adminID = "7f21b9a2-3c4e-4b1a-9f2e-91d3b6c5e7a1";
    this.cardService.getPackagesByAdminId(adminID).subscribe(data => {
      this.packages = data;
    })
  }

  navigateTo(path : string) {
    this.router.navigate([`/${path}`]);
  }
  
  

}


