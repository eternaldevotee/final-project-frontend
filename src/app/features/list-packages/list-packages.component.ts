import { Component } from '@angular/core';
import { DynamicCardService } from '../../core/services/dynamic-card.service';
import { TravelPackageModel } from '../../core/models/TravelPackageModel';

@Component({
  selector: 'app-list-packages',
  standalone: false,
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packages!: TravelPackageModel[];

  constructor(private cardService : DynamicCardService){}

  ngOnInit() : void {
    this.cardService.getPackages().subscribe(data => {
      this.packages = data;
    })
  }
  

}
