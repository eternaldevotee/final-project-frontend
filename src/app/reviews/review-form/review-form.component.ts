// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReviewsService } from '../reviews.service';
// import { Review } from '../review.model';

// @Component({
//   selector: 'app-review-form',
//   standalone: false, 
//   templateUrl: './review-form.component.html',
//   styleUrls: ['./review-form.component.css']
// })
// export class ReviewFormComponent implements OnInit {
//   @Input() packageId!: number;
//   form!: FormGroup;
//   submitting = false;
//   ratings = [5, 4, 3, 2, 1];
//   currentUserId = 1; // In a real app, this would come from an authentication service

//   constructor(private fb: FormBuilder,private reviewsService: ReviewsService) {}
  

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       rating: [null, [Validators.required]],
//       comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
//     });
//   }

//   submit(): void {
//     if (this.form.invalid || this.submitting) {
//       return;
//     }
//     this.submitting = true;

//     const payload: Omit<Review, 'reviewId' | 'timestamp' | 'status'> = {
//       userId: this.currentUserId,
//       packageId: this.packageId,
//       rating: this.form.value.rating,
//       comment: this.form.value.comment
//     };

//     this.reviewsService.createReview(payload).subscribe({
//       next: () => {
//         alert('Thanks! Your review has been submitted for moderation.');
//         this.form.reset();
//         // Manually reset validators and state
//         Object.keys(this.form.controls).forEach(key => {
//             this.form.get(key)?.setErrors(null) ;
//         });
//         this.submitting = false;
//       },
//       error: () => {
//         alert('Failed to submit your review. Please try again later.');
//         this.submitting = false;
//       }
//     });
//    }
// }



import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review-form',
  standalone: false,
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() packageId!: number;
  form!: FormGroup;
  submitting = false;
  ratings = [1, 2, 3, 4, 5]; // ✅ Changed to ascending order for the UI
  hoveredRating = 0;          // ✅ To manage the hover effect
  currentUserId = 1; // In a real app, this would come from an authentication service

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: [null, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  // ✅ Method to set the rating when a star is clicked
  setRating(rating: number): void {
    this.form.get('rating')?.setValue(rating);
    this.form.get('rating')?.setValue(rating);
    this.form.get('rating')?.markAsTouched();
  }

  submit(): void {
    if (this.form.invalid || this.submitting) {
      // Mark all fields as touched to display validation errors
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const payload: Omit<Review, 'reviewId' | 'timestamp' | 'status'> = {
      userId: this.currentUserId,
      packageId: this.packageId,
      rating: this.form.value.rating,
      comment: this.form.value.comment
    };

    this.reviewsService.createReview(payload).subscribe({
      next: () => {
        alert('Thanks! Your review has been submitted for moderation.');
        this.form.reset();
        // Manually reset validators and state
        Object.keys(this.form.controls).forEach(key => {
            this.form.get(key)?.setErrors(null) ;
        });
        this.submitting = false;
      },
      error: () => {
        alert('Failed to submit your review. Please try again later.');
        this.submitting = false;
      }
    });
   }
}