import { Component, OnInit,Input } from '@angular/core';
import { DynamicCardService, TravelPackage } from '../../Services/dynamic-card.service';
@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  // @Input() packages: any[] = [];
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
