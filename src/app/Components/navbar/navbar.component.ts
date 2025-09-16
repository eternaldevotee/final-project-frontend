import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchserviceService } from '../../Service/searchservice.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

   searchTerm: string = '';
  // data: any[] = [];
  filteredResults: any[] = [];



  // searchForm = new FormGroup({
  //   searchTerm: new FormControl(''),
  // })

  constructor(private service: SearchserviceService) {}
  ngOnInit(): void {
    this.service.getAllData().subscribe((res=>{
      this.filteredResults=res;
    }));
  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  //   this.onSearch();
  // }

  // onSearch(): void {
  //   this.rest.fetchMatchingPackages(this.searchTerm).subscribe((res =>{
  //     console.log(res);
  //     this.filteredResults=res;
  //   }));
  // }

}
