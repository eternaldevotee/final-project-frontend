
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../../../core/services/adminservice.service';


@Component({
  selector: 'app-packages',
  standalone:false,
  templateUrl: './admin-packages.component.html'
})
export class AdminPackagesComponent implements OnInit {
  packages: any[] = [];

  constructor(private packageService: AdminserviceService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
    });
  }

  deletePackage(id: number): void {
    this.packageService.deletePackage(id).subscribe(() => {
      this.packages = this.packages.filter(pkg => pkg.id !== id);
    });
  }
}
