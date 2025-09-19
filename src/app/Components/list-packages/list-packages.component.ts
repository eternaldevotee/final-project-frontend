import { Component } from '@angular/core';
import { DynamicCardService, TravelPackage } from '../../Service/dynamic-card.service';

@Component({
  selector: 'app-list-packages',
  standalone: false,
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packages!: TravelPackage[];

  constructor(private cardService : DynamicCardService){}

  ngOnInit() : void {
    this.cardService.getPackages().subscribe(data => {
      this.packages = data;
    })
  }
  

}
