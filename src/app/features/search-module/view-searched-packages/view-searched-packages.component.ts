import { Component } from '@angular/core';
import { DynamicCardService } from '../../../core/services/dynamic-card.service';
import { ActivatedRoute } from '@angular/router';
import { TravelPackageModel } from '../../../core/models/TravelPackageModel';


@Component({
  selector: 'app-view-searched-packages',
  standalone: false,
  templateUrl: './view-searched-packages.component.html',
  styleUrl: './view-searched-packages.component.css'
})
export class ViewSearchedPackagesComponent {
      packages! : TravelPackageModel[];
      Location!: string |null;
      constructor(private cardService : DynamicCardService,private route: ActivatedRoute) {}

      ngOnInit(): void {
          this.Location=this.route.snapshot.paramMap.get('Location');
          this.cardService.getPackages().subscribe(data => {
              this.packages = data.filter((travelPackage: { location: string; }) => travelPackage.location===this.Location);
            });
      
      }
}
