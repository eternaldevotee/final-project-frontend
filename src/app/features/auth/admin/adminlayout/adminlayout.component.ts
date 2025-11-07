import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminlayout',
  standalone: false,
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent implements OnInit, OnDestroy {
  loading = false;
  showLandingPage = true;
  private routerSubscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check initial route
    this.checkRoute();

    // Listen to router events to show/hide spinner and check route
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Navigation started - show spinner
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Navigation finished/cancelled/error - hide spinner
        this.loading = false;
        this.checkRoute();
      }
    });
  }

  checkRoute(): void {
    // Show landing page only when on exact /admindashboard route
    const currentUrl = this.router.url;
    this.showLandingPage = currentUrl === '/admindashboard' || currentUrl === '/admindashboard/';
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
