import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicCardService, TravelPackage } from '../../Services/dynamic-card.service';
import { ShareloginService } from '../../Services/sharelogin.service';

@Component({
  selector: 'app-card-detail',
  standalone: false,
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  package!: TravelPackage;

  constructor(private route : ActivatedRoute, private cardService : DynamicCardService, private routeBooking: Router, private shareLoginService: ShareloginService){}

    ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.cardService.getPackages().subscribe(packages => {
          this.package = packages.find((pkg : TravelPackage) => pkg.PackageID === id)!;
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
