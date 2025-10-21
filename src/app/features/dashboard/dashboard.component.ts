import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TravelPackageModel } from "../../core/models/TravelPackageModel";
import { DynamicCardService } from "../../core/services/dynamic-card.service";
import { TravelPackageService } from "../../core/services/travel-package.service";

@Component({
  selector: 'app-dashboard',
  standalone : false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  createPackageForm: FormGroup;
  myPackages: TravelPackageModel[] = [];
  isEditMode = false;
  editingPackageId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private packageService: DynamicCardService,
    private route: ActivatedRoute,
    private packageService1: TravelPackageService,
    private router: Router
  ) {
    this.createPackageForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      duration: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      includedServices: this.fb.array<FormControl<string>>([]),
      imageSrc: ['', [Validators.required]],
      detailedDescription: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  editPackage(pkg: TravelPackageModel): void {
    this.isEditMode = true;
    console.log("I am in the edit mode and currently before that patch value");
    this.editingPackageId = pkg.packageID;

    this.createPackageForm.patchValue({
      title: pkg.title,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price,
      imageSrc: pkg.imageSrc,
      detailedDescription: pkg.detailedDescription,
      location: pkg.location,
    });

    this.includedServices.clear();
    pkg.includedServices.forEach((service) =>
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
    console.log("The id in the ngONINTIT" , id);  
    if (id) {
      this.isEditMode = true;
      this.editingPackageId = id;
      this.packageService.getPackageById(id).subscribe((pkg) => {
        this.editPackage(pkg);
      });
    }
  }

  get includedServices(): FormArray<FormControl<string>> {
    return this.createPackageForm.get('includedServices') as FormArray<FormControl<string>>;
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

  submit(): void {
    // const payload: TravelPackageModel = {
    //   ...this.createPackageForm.value,
    //   packageID: this.editingPackageId ?? Math.floor(Math.random() * 1000000).toString(),
    // };

    const payload : TravelPackageModel = {
      ...this.createPackageForm.value
    }

    console.log('payload', payload);

    if (this.isEditMode) {
      console.log("We are in dashboard edit func " , this.editingPackageId);
      if(this.editingPackageId !== null) {
        payload.packageID = this.editingPackageId;
      }
      console.log("just loggin the payload " , payload);
    
      this.packageService.updatePackage(payload.packageID, payload).subscribe(() => {
        this.resetForm();
        this.loadPackages();
        alert('Package edited');
        this.router.navigate(['agent/package', payload.packageID]);
      });
    } else {
      this.packageService.createPackage(payload).subscribe((createdPkg) => {
        alert('New Package created');
        this.router.navigate(['/agent/package', createdPkg.packageID]);
      });
    }
  }
}



