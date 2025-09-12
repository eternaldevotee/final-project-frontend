import { Component, OnInit } from '@angular/core';
import { DynamicCardService, TravelPackage } from '../../Service/dynamic-card.service';
@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
      packages! : TravelPackage[];

      constructor(private cardService : DynamicCardService) {}

      ngOnInit(): void {
        this.cardService.getPackages().subscribe(data => {
          console.log(data)
          this.packages = data;
          console.log(this.packages)
        });
      }
}
