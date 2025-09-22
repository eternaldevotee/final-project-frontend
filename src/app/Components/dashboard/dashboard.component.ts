import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import {
  TravelPackageService,
  TravelPackage1,
} from '../../Service/travel-package.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  DynamicCardService,
  TravelPackage,
} from '../../Service/dynamic-card.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  createPackageForm: FormGroup;
  myPackages: TravelPackage[] = [];
  isEditMode = false;
  editingPackageId: number | null = null;
  idPackage : string | "" = "";

  constructor(
    private fb: FormBuilder,
    private packageService: DynamicCardService,
    private route: ActivatedRoute,
    private packageService1: TravelPackageService
  ) {
    this.createPackageForm = this.fb.group({
      Title: ['', [Validators.required, Validators.maxLength(100)]],
      Description: ['', [Validators.required, Validators.maxLength(1000)]],
      Duration: ['', [Validators.required]],
      Price: [null, [Validators.required, Validators.min(0)]],
      IncludedServices: this.fb.array<FormControl<string>>([]),
      ImageSrc: ['', [Validators.required]],
      DetailedDescription: ['', [Validators.required]],
      // Location : ['']
    });
  }

  editPackage(pkg: TravelPackage): void {
    this.isEditMode = true;
    this.editingPackageId = pkg.PackageID;
    this.idPackage = pkg.id;
    

    this.createPackageForm.patchValue({
      Title: pkg.Title,
      Description: pkg.Description,
      Duration: pkg.Duration,
      Price: pkg.Price,
      ImageSrc: pkg.ImageSrc,
      DetailedDescription : pkg.DetailedDescription
    });

    this.includedServices.clear();
    pkg.IncludedServices.forEach((service) =>
      this.includedServices.push(
        this.fb.control(service, {
          nonNullable: true,
          validators: [Validators.required],
        })
      )
    );
  }

  ngOnInit(): void {
    this.loadPackages();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editingPackageId = +id;
      this.packageService.getPackageById(id).subscribe((pkg) => {
        this.editPackage(pkg);
      });
    }
    this.loadPackages();
  }

  get includedServices(): FormArray<FormControl<string>> {
    return this.createPackageForm.get('IncludedServices') as FormArray<
      FormControl<string>
    >;
  }

  addIncludedService(value: string = ''): void {
    this.includedServices.push(
      this.fb.control<string>(value, {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  resetForm(): void {
  this.createPackageForm.reset();
  this.includedServices.clear();
  this.isEditMode = false;
  this.editingPackageId = null;
}


  removeIncludedService(index: number): void {
    this.includedServices.removeAt(index);
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe((pkgs) => {
      this.myPackages = pkgs;
    });
  }

  // submit(): void {
  //   if (this.createPackageForm.invalid) {
  //     this.createPackageForm.markAllAsTouched();
  //     return;
  //   }
  //   const payload = this.createPackageForm.value


  //   this.packageService1.createPackage(payload).subscribe(() => {
  //     this.createPackageForm.reset();
  //     this.includedServices.clear();
  //     this.loadPackages();
  //   });
  // }

  submit(): void {
    console.log("hi in the sumbit function");
    console.log(this.isEditMode);
    // if(this.createPackageForm.invalid) {
    //   this.createPackageForm.markAllAsTouched();
    //   return;
    // }
    // const payload = this.createPackageForm.value;
    const payload = {
  ...this.createPackageForm.value,
  PackageID: this.editingPackageId,
  id: this.idPackage
};


    console.log("payload", payload);
    

    if(this.isEditMode) {
      console.log("in edit page")
      this.packageService.updatePackage(this.idPackage, payload).subscribe(() => {
        this.resetForm();
        this.loadPackages();
      });
    }
    else {
      this.packageService1.createPackage(payload).subscribe(() => {
        this.createPackageForm.reset();
        this.includedServices.clear();
        this.loadPackages();
      })
    }
  }
}
