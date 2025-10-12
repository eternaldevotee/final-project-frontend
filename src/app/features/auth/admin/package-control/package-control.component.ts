
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AdminserviceService } from '../../../../core/services/adminservice.service';
@Component({
  selector: 'app-control-packages',
  templateUrl: './package-control.component.html',
  styleUrls: ['./package-control.component.css']
})
export class PackageControlComponent implements OnInit {
  

  packages: any[] = [];
filteredPackages:any[]=[];
search:string="";
 
  constructor(private packageService: AdminserviceService) {}


  ngOnInit(): void {
    this.loadPackages();
  }


  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
      this.filteredPackages=data; 
    });
  }
searchPackages(searchTerm: string): void {
    if (!searchTerm) {
      console.log("Searching for:", searchTerm);
    
      this.filteredPackages=this.packages;
    } else {

      this.filteredPackages = this.packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  goBack()
  {
    this.filteredPackages=this.packages;
  }

  deletePackage(id: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.deletePackage(id).subscribe(() => {
  
        this.packages = this.packages.filter(pkg => pkg.id !== id);
        console.log(`Package with ID ${id} deleted successfully.`);
      });
    }
  }
}