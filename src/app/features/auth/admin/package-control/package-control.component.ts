import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../../core/services/adminservice.service';
import Swal from 'sweetalert2';
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
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
      this.filteredPackages = data;
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageService.deletePackage(id).subscribe(() => {
          this.packages = this.packages.filter(pkg => pkg.packageID !== id);
          this.filteredPackages = this.filteredPackages.filter(pkg => pkg.packageID !== id);
          Swal.fire('Deleted!', 'The package has been deleted.', 'success');
        });
      }
    });
  }
}
