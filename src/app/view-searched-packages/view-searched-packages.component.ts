import { Component } from '@angular/core';
import { TravelPackage, DynamicCardService } from '../Services/dynamic-card.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-searched-packages',
  standalone: false,
  templateUrl: './view-searched-packages.component.html',
  styleUrl: './view-searched-packages.component.css'
})
export class ViewSearchedPackagesComponent {
      packages! : TravelPackage[];
      Location!:string |null;
      constructor(private cardService : DynamicCardService,private route: ActivatedRoute) {}

      ngOnInit(): void {
        this.route.params.subscribe(data=>{
          this.Location=this.route.snapshot.paramMap.get('Location');
          this.cardService.getPackages().subscribe(data => {
              this.packages = data.filter((travelPackage: { Location: string; }) => travelPackage.Location===this.Location);
            });
        })
      }
}
