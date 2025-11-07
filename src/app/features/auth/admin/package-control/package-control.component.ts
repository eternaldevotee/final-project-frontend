import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../../core/services/adminservice.service';
// import Swal from 'sweetalert2'; // Swal import removed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-packages',
  templateUrl: './package-control.component.html',
  styleUrls: ['./package-control.component.css']
})
export class PackageControlComponent implements OnInit {

  packages: any[] = [];
  filteredPackages: any[] = [];
  search: string = "";

  constructor(private packageService: AdminserviceService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe({
        next: (data) => {
            this.packages = data;
            this.filteredPackages = data;
        },
        error: (err) => {
            console.error('Failed to load packages:', err);
            // Added simple error alert for loading failure
            alert('Failed to load packages. Please try again.');
        }
    });
  }

  searchPackages(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredPackages = this.packages;
    } else {
      this.filteredPackages = this.packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  goBack(): void {
    this.filteredPackages = this.packages;
    this.search = "";
  }

  deletePackage(id: string): void {
    // ⭐ Replaced Swal.fire confirmation with native window.confirm()
    const isConfirmed = window.confirm(
        'Are you sure you want to delete this package? This action cannot be undone!'
    );

    if (isConfirmed) {
        this.packageService.deletePackage(id).subscribe({
            next: () => {
                this.packages = this.packages.filter(pkg => pkg.packageID !== id);
                this.filteredPackages = this.filteredPackages.filter(pkg => pkg.packageID !== id);
                
                // ⭐ Replaced Swal.fire success alert with native alert()
                alert('Deleted! The package has been deleted.');
            },
            error: (err) => {
                console.error('Failed to delete package:', err);
                // Added simple error alert for deletion failure
                alert('Deletion failed. Please try again.');
            }
        });
    }
  }
}