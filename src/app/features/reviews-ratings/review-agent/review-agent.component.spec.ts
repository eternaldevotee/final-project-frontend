// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReviewAgentComponent } from './review-agent.component';
// import { of } from 'rxjs';
// import { Review } from '../../../core/models/ReviewModel';


// // Import all modules used in the template
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDividerModule } from '@angular/material/divider';
// import { ReviewsService } from '../../../core/services/reviews/reviews.service';

// describe('ReviewAgentComponent', () => {
//   let component: ReviewAgentComponent;
//   let fixture: ComponentFixture<ReviewAgentComponent>;
//   let mockReviewsService: jasmine.SpyObj<ReviewsService>;

//   const mockPublishedReviews: Review[] = [
//     { reviewId: '1', userId: 'u1', userName: 'User A', packageId: 'pkg1', rating: 5, comment: 'Was great', timestamp: new Date().toISOString(), status: 'PUBLISHED' },
//     { reviewId: '2', userId: 'u2', userName: 'User B', packageId: 'pkg1', rating: 4, comment: 'Was good', timestamp: new Date().toISOString(), status: 'PUBLISHED', agentResponse: 'Thanks!' },
//   ];

//   beforeEach(async () => {
//     mockReviewsService = jasmine.createSpyObj('ReviewsService', ['getReviewsForPackage', 'respondToReview']);

//     mockReviewsService.getReviewsForPackage.and.returnValue(of(mockPublishedReviews));
//     mockReviewsService.respondToReview.and.returnValue(of({} as Review));

//     await TestBed.configureTestingModule({
//       declarations: [ReviewAgentComponent],
//       imports: [
//         CommonModule,
//         NoopAnimationsModule,
//         MatCardModule,
//         MatIconModule,
//         MatButtonModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatDividerModule,
//       ],
//       providers: [
//         { provide: ReviewsService, useValue: mockReviewsService }
//       ]
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(ReviewAgentComponent);
//     component = fixture.componentInstance;

//     component.packageId = 'pkg1'; // Set @Input
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getReviewsForPackage with correct packageId on init', () => {
//     expect(mockReviewsService.getReviewsForPackage).toHaveBeenCalledWith('pkg1');
//   });

//   it('should call respondToReview when respond() is called with valid text', () => {
//     const reviewToRespondTo = mockPublishedReviews[0];
//     const responseText = 'This is our response.';

//     component.respond(reviewToRespondTo, responseText);

//     expect(mockReviewsService.respondToReview).toHaveBeenCalledWith(reviewToRespondTo.reviewId, responseText);
//   });

//   it('should NOT call respondToReview if response text is empty', () => {
//     spyOn(window, 'alert');
//     const reviewToRespondTo = mockPublishedReviews[0];

//     component.respond(reviewToRespondTo, '');
//     expect(window.alert).toHaveBeenCalledWith('Response cannot be empty.');
//     expect(mockReviewsService.respondToReview).not.toHaveBeenCalled();
//   });

//   it('should show the response form for a review without a response', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const reviewElements = compiled.querySelectorAll('.review-wrap');

//     const firstReview = reviewElements[0];
//     expect(firstReview.querySelector('.response-form')).toBeTruthy();
//     expect(firstReview.querySelector('.agent-response')).toBeFalsy();
//   });

//   it('should show the agent response text for a review with a response', () => {
//     const compiled = fixture.nativeElement as HTMLElement;
//     const reviewElements = compiled.querySelectorAll('.review-wrap');

//     const secondReview = reviewElements[1];
//     expect(secondReview.querySelector('.response-form')).toBeFalsy();
//     expect(secondReview.querySelector('.agent-response')).toBeTruthy();
//     expect(secondReview.querySelector('.agent-response-text')?.textContent).toContain('Thanks!');
//   });
// });