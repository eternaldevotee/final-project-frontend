import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewListComponent } from './review-list.component';
import { of } from 'rxjs';
import { Review } from '../../../core/models/ReviewModel';

// Import all modules used in the template
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// 1. IMPORT THE RXJS OPERATORS
import { skip, take } from 'rxjs/operators';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';


const mockReviewsList: Review[] = [
  { reviewId: '1', userId: 'u1', userName: 'User A', packageId: 'pkg1', rating: 5, comment: 'Excellent', timestamp: new Date().toISOString(), status: 'PUBLISHED' },
  { reviewId: '2', userId: 'u2', userName: 'User B', packageId: 'pkg1', rating: 3, comment: 'Good', timestamp: new Date().toISOString(), status: 'PUBLISHED' },
  { reviewId: '3', userId: 'u3', userName: 'User C', packageId: 'pkg1', rating: 5, comment: 'Also Excellent', timestamp: new Date().toISOString(), status: 'PUBLISHED' },
];

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;
  let mockReviewsService: jasmine.SpyObj<ReviewsService>;

  beforeEach(async () => {
    mockReviewsService = jasmine.createSpyObj('ReviewsService', ['getReviewsForPackage']);
    mockReviewsService.getReviewsForPackage.and.returnValue(of(mockReviewsList));

    await TestBed.configureTestingModule({
      declarations: [ReviewListComponent],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        { provide: ReviewsService, useValue: mockReviewsService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;

    component.packageId = 'pkg1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getReviewsForPackage on init', () => {
    expect(mockReviewsService.getReviewsForPackage).toHaveBeenCalledWith('pkg1');
  });

  it('should display all reviews by default', (done) => {
    // 2. ADD take(1) TO THE PIPE
    component.filteredReviews$.pipe(take(1)).subscribe(reviews => {
      expect(reviews.length).toBe(3);
      expect(reviews).toEqual(mockReviewsList);
      done();
    });
  });

  it('should display correct counts by default', (done) => {
    // 3. ADD take(1) TO THE PIPE
    component.counts$.pipe(take(1)).subscribe(counts => {
      expect(counts.total).toBe(3);
      expect(counts.visible).toBe(3);
      done();
    });
  });

  it('should filter reviews when setRatingFilter(5) is called', (done) => {
    // 4. FIX: Skip the initial emission, take the new one
    component.filteredReviews$.pipe(
      skip(1), // Skip the initial value
      take(1)  // Take the next value
    ).subscribe(filtered => {
      // 5. Assert INSIDE the subscription
      expect(filtered.length).toBe(2);
      expect(filtered[0].rating).toBe(5);
      expect(filtered[1].rating).toBe(5);
      done();
    });

    // 6. Trigger the action AFTER subscribing
    component.setRatingFilter(5);
  });

  it('should update counts when setRatingFilter(3) is called', (done) => {
    // 7. FIX: Skip the initial emission, take the new one
    component.counts$.pipe(
      skip(1), // Skip initial counts
      take(1)  // Take counts after filter
    ).subscribe(counts => {
      expect(counts.total).toBe(3);
      expect(counts.visible).toBe(1);
      done();
    });

    // 8. Trigger the action AFTER subscribing
    component.setRatingFilter(3); // Apply filter
  });
});