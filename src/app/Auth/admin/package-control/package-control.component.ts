
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../Service/adminservice.service'; // Adjust the path as needed
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-control-packages',
  templateUrl: './package-control.component.html',
  styleUrls: ['./package-control.component.css']
})
export class PackageControlComponent implements OnInit {
  
  // This array will hold the packages fetched from the server.
  packages: any[] = [];

  // Inject the PackageService to use its methods.
  constructor(private packageService: AdminserviceService) {}

  // ngOnInit is a lifecycle hook that runs once when the component is initialized.
  ngOnInit(): void {
    this.loadPackages();
  }

  // Method to fetch all packages from the service.
  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
    });
  }

  // Method to delete a package. It's called from the button in the HTML.
  deletePackage(id: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.deletePackage(id).subscribe(() => {
        // After successful deletion, remove the package from the local array
        // to instantly update the UI without a page refresh.
        this.packages = this.packages.filter(pkg => pkg.PackageID !== id);
        console.log(`Package with ID ${id} deleted successfully.`);
      });
    }
  }
}