import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TravelPackageService, TravelPackage } from '../../../Service/travel-package.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  createPackageForm: FormGroup;
  myPackages: TravelPackage[] = [];

  constructor(private fb: FormBuilder, private packageService: TravelPackageService) {
    this.createPackageForm = this.fb.group({
      Title: ['', [Validators.required, Validators.maxLength(100)]],
      Description: ['', [Validators.required, Validators.maxLength(1000)]],
      Duration: ['', [Validators.required]],
      Price: [null, [Validators.required, Validators.min(0)]],
      IncludedServices: this.fb.array<FormControl<string>>([])
    });
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  get includedServices(): FormArray<FormControl<string>> {
    return this.createPackageForm.get('IncludedServices') as FormArray<FormControl<string>>;
  }

  addIncludedService(value: string = ''): void {
    this.includedServices.push(this.fb.control<string>(value, { nonNullable: true, validators: [Validators.required] }));
  }

  removeIncludedService(index: number): void {
    this.includedServices.removeAt(index);
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(pkgs => {
      this.myPackages = pkgs;
    });
  }

  submit(): void {
    if (this.createPackageForm.invalid) {
      this.createPackageForm.markAllAsTouched();
      return;
    }
    const payload = this.createPackageForm.value as Omit<TravelPackage, 'PackageID'>;
    this.packageService.createPackage(payload).subscribe(() => {
      this.createPackageForm.reset();
      this.includedServices.clear();
      this.loadPackages();
    });
  }
}
