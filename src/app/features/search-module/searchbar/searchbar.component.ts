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
  searchTerm: string = '';
  filteredResults: string[] = [];
  allPlaces: string[] = [];

  constructor(private service: SearchserviceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData().subscribe(packages => {
      const locations = packages.map((pkg: { location: string }) => pkg.location);
      const uniqueLocations = [...new Set(locations)];
      this.allPlaces = uniqueLocations;
    });
  }

  onInputChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredResults = this.allPlaces.filter(place =>
      place.toLowerCase().startsWith(term)
    );
  }

  selectPlace(place: string): void {
    this.searchTerm = place;
    this.filteredResults = [];
  }

  onSearch(): void {
    this.router.navigate(['home/viewsearch/', this.searchTerm], { fragment: 'router-view' });
  }
}
