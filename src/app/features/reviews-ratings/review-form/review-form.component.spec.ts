// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReviewFormComponent } from './review-form.component';
// import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
// import { of, throwError } from 'rxjs';

// // Import all modules used in the template
// import { ReactiveFormsModule } from '@angular/forms';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common'; 
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { Review } from '../../../core/models/ReviewModel';
// import { ReviewsService } from '../../../core/services/reviews/reviews.service';


// describe('ReviewFormComponent', () => {
//   let component: ReviewFormComponent;
//   let fixture: ComponentFixture<ReviewFormComponent>;
//   let mockReviewsService: jasmine.SpyObj<ReviewsService>;
//   let mockLoginService: jasmine.SpyObj<ShareloginService>;

//   beforeEach(async () => {
//     mockReviewsService = jasmine.createSpyObj('ReviewsService', ['createReview']);
//     mockLoginService = jasmine.createSpyObj('ShareloginService', ['isLoggedIn', 'getUserId']);

//     await TestBed.configureTestingModule({
//       declarations: [ReviewFormComponent],
//       imports: [
//         CommonModule, 
//         ReactiveFormsModule, 
//         NoopAnimationsModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatButtonModule,
//         MatIconModule,
//       ],
//       providers: [
//         { provide: ReviewsService, useValue: mockReviewsService },
//         { provide: ShareloginService, useValue: mockLoginService }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ReviewFormComponent);
//     component = fixture.componentInstance;
    
//     component.packageId = 'pkg1';
//     mockLoginService.getUserId.and.returnValue('user123');
    
//     fixture.detectChanges(); // Triggers ngOnInit
//   });

//   it('should create and initialize the form', () => {
//     expect(component).toBeTruthy();
//     expect(component.form).toBeDefined();
//   });

//   it('form should be valid with correct data', () => {
//     component.form.patchValue({ rating: 4, comment: 'This is a perfectly valid comment.' });
//     expect(component.form.valid).toBeTruthy();
//   });

//   it('setRating() should update the form control', () => {
//     component.setRating(5);
//     expect(component.form.controls['rating'].value).toBe(5);
//   });

//   it('submit() should call createReview if user is logged in and form is valid', () => {
//     mockLoginService.isLoggedIn.and.returnValue(true);
//     mockReviewsService.createReview.and.returnValue(of({} as Review));
//     spyOn(window, 'alert');
//     spyOn(component, 'clear');

//     component.form.patchValue({ rating: 4, comment: 'A valid comment.' });
//     component.submit();

//     const expectedPayload = {
//       rating: 4,
//       comment: 'A valid comment.',
//       userId: 'user123',
//       packageId: 'pkg1'
//     };

//     expect(mockReviewsService.createReview).toHaveBeenCalledWith(expectedPayload);
//     expect(window.alert).toHaveBeenCalledWith('Thanks! Your review has been submitted for moderation.');
//     expect(component.clear).toHaveBeenCalled();
//   });
// });
