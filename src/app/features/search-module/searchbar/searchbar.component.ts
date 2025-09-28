import { Component } from '@angular/core';
import { SearchserviceService } from '../../../core/services/search/searchservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: false,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {

   searchTerm: String = '';
   filteredResults: String[] = [];
   allPlaces: String[] = [];
  
  onInputChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredResults = this.allPlaces.filter(place =>
      place.toLowerCase().startsWith(term)
    );
  }
  
  selectPlace(place: String) {
    this.searchTerm = place;
    this.filteredResults = [];
  }

  constructor(private service: SearchserviceService,private router: Router) {}

  onSearch() {
    this.router.navigate(['home/viewsearch/', this.searchTerm], { fragment: 'router-view' });
  }

  ngOnInit(): void {
      this.service.getAllData().subscribe((packages=>{
      const locations = packages.map((pkg: { Location: string; }) => pkg.Location);
      const uniqueLocations = [...new Set(locations)]; // removes duplicates
      this.allPlaces=uniqueLocations;
    }));
  }
}
