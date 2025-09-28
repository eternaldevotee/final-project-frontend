import { Component, OnInit,Input } from '@angular/core';
import { DynamicCardService } from '../../../core/services/dynamic-card.service';
import { TravelPackageModel } from '../../../core/models/TravelPackageModel';
@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  // @Input() packages: any[] = [];
      packages! : TravelPackageModel[];

      constructor(private cardService : DynamicCardService) {}

      ngOnInit(): void {
        this.cardService.getPackages().subscribe(data => {
          console.log(data)
          this.packages = data;
          console.log(this.packages)
        });
      }
}
