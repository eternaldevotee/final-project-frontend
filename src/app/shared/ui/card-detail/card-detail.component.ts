import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCardService } from '../../../core/services/dynamic-card.service';
import { ShareloginService } from '../../../core/services/sharelogin.service';
import { TravelPackageModel } from '../../../core/models/TravelPackageModel';

@Component({
  selector: 'app-card-detail',
  standalone: false,
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  package!: TravelPackageModel;

  constructor(private route : ActivatedRoute, private cardService : DynamicCardService, private routeBooking: Router, private shareLoginService: ShareloginService){}

    ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.cardService.getPackages().subscribe(packages => {
          this.package = packages.find((pkg : TravelPackageModel) => pkg.PackageID === id)!;
          //to scroll back to routeroutlet
          window.scrollTo({top : 0, behavior:'smooth'});
        })
      })
    }

    onBookNow(){
      if(this.shareLoginService.isLoggedIn()){
        this.routeBooking.navigate(['/booking',this.package.PackageID]);
      }else{
        alert("Please log in to book!!")
      }

    }
}
