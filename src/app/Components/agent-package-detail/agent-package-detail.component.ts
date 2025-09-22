import { Component } from '@angular/core';
import { DynamicCardService, TravelPackage } from '../../Service/dynamic-card.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-package-detail',
  standalone: false,
  templateUrl: './agent-package-detail.component.html',
  styleUrl: './agent-package-detail.component.css'
})
export class AgentPackageDetailComponent {
  package! : TravelPackage;



  constructor(private route : ActivatedRoute, private cardService : DynamicCardService, private router : Router) {}

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log(id);
      console.log("inside the admin card detail page")

      this.cardService.getPackages().subscribe(packages => {
        this.package = packages.find((pkg : TravelPackage) => pkg.PackageID === id)!;
        console.log("got package")
        console.log(this.package);
        window.scrollTo({top: 0, behavior: 'smooth'})
      })
    })
  }

  onDeleteAgent(id : string) : void {
    console.log(id);
    console.log("in delete func")
    this.cardService.deletePackage(id).subscribe(() => {
      console.log("Deleted package sucessfully");
      this.router.navigate(['/packages']);
    })
  }
  
}

