// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReviewAdminComponent } from './review-admin.component';
// import { of } from 'rxjs';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { MatDividerModule } from '@angular/material/divider';
// import { Review } from '../../../core/models/ReviewModel';
// import { ReviewsService } from '../../../core/services/reviews/reviews.service';


// // Mock data
// const mockPendingReviews: Review[] = [
//   {
//     reviewId: '1',
//     userId: 'u1',
//     userName: 'Test User',
//     packageId: 'pkg1',
//     rating: 5,
//     comment: 'Pending review',
//     timestamp: new Date().toISOString(),
//     status: 'PENDING'
//   }
// ];

// describe('ReviewAdminComponent', () => {
//   let component: ReviewAdminComponent;
//   let fixture: ComponentFixture<ReviewAdminComponent>;
//   let mockReviewsService: jasmine.SpyObj<ReviewsService>;

//   beforeEach(async () => {
//     mockReviewsService = jasmine.createSpyObj('ReviewsService', ['getPendingReviews', 'moderateReview']);

//     // Set default mock implementation
//     mockReviewsService.getPendingReviews.and.returnValue(of(mockPendingReviews));
//     mockReviewsService.moderateReview.and.returnValue(of({} as Review));

//     await TestBed.configureTestingModule({
//       declarations: [ReviewAdminComponent],
//       imports: [
//         NoopAnimationsModule,
//         CommonModule,
//         MatCardModule,
//         MatIconModule,
//         MatButtonModule,
//         MatDividerModule
//       ],
//       providers: [
//         { provide: ReviewsService, useValue: mockReviewsService }
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(ReviewAdminComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Triggers ngOnInit
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getPendingReviews on init and load reviews', (done) => {
//     expect(mockReviewsService.getPendingReviews).toHaveBeenCalledTimes(1);

//     component.pending$.subscribe(reviews => {
//       expect(reviews).toEqual(mockPendingReviews);
//       done();
//     });
//   });

//   it('should call moderateReview(id, true) when publish is clicked', () => {
//     component.publish('1');
//     expect(mockReviewsService.moderateReview).toHaveBeenCalledWith('1', true);
//   });

//   it('should call moderateReview(id, false) when reject is clicked', () => {
//     component.reject('1');
//     expect(mockReviewsService.moderateReview).toHaveBeenCalledWith('1', false);
//   });

//   it('should display the pending reviews in the template', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.pending-item')).toBeTruthy();
//     expect(compiled.querySelector('.review-card mat-card-title')?.textContent).toContain('Review from Test User');
//     expect(compiled.querySelector('.review-card p')?.textContent).toContain('Pending review');
//     expect(compiled.querySelector('.empty-state')).toBeFalsy();
//   });

//   it('should display the empty state when there are no pending reviews', () => {
//     // Arrange: Re-mock the service to return an empty array for this test
//     mockReviewsService.getPendingReviews.and.returnValue(of([]));

//     // Act: Re-run ngOnInit to fetch new data
//     component.ngOnInit();
//     fixture.detectChanges();

//     // Assert
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.pending-item')).toBeFalsy();
//     expect(compiled.querySelector('.empty-state')).toBeTruthy();
//     expect(compiled.querySelector('.empty-state p')?.textContent).toContain('Great job! No pending reviews.');
//   });
// });