import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicCardService, TravelPackage } from '../../Service/dynamic-card.service';

@Component({
  selector: 'app-card-detail',
  standalone: false,
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  package!: TravelPackage;

  constructor(private route : ActivatedRoute, private cardService : DynamicCardService){}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   if(id) {
  //     this.cardService.getPackages().subscribe(packages => {
  //       this.package = packages.find((pkg : TravelPackage) => pkg.PackageID === id)!;
  //       console.log(this.package);
  //       console.log(this.package.Title)
  //     });
      
  //   }
  // }
  

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

}
