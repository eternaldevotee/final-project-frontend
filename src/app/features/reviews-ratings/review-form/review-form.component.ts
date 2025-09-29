import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../reviews.service';
import { Review } from '../../../core/models/ReviewModel';
import { ShareloginService } from '../../../core/services/sharelogin.service';


@Component({
  selector: 'app-review-form',
  standalone:false,
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() packageId!: number;
  form!: FormGroup;
  submitting = false;

  ratings: number[] = [1, 2, 3, 4, 5];
  hoveredRating = 0;
  currentUserId = 1;

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService, private shareLoginService: ShareloginService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: [null, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  setRating(rating: number): void {
    this.form.get('rating')?.setValue(rating);
    this.form.get('rating')?.markAsTouched();
  }

  clear(): void {
    this.form.reset({ rating: null, comment: '' });
    this.hoveredRating = 0;
  }

  get ratingLabel(): string {
    const r = this.form.get('rating')?.value || 0;
    if (r >= 5) return 'Excellent';
    if (r >= 4) return 'Very good';
    if (r >= 3) return 'Good';
    if (r >= 2) return 'Fair';
    if (r >= 1) return 'Poor';
    return 'Not rated';
  }


  submit(): void {
    // this.form.markAllAsTouched();

    // if (this.form.invalid || this.submitting) {
    //   return;
    // }
    if(this.shareLoginService.isLoggedIn()){
      this.submitting = true;
      const payload: Omit<Review, 'reviewId' | 'timestamp' | 'status'> = {
        ...this.form.value,
        userId: this.currentUserId,
        packageId: this.packageId
      };

      this.reviewsService.createReview(payload).subscribe({
        next: () => {
          alert('Thanks! Your review has been submitted for moderation.');
          this.clear();
          this.submitting = false;
        },
        error: () => {
          alert('Failed to submit your review. Please try again later.');
          this.submitting = false;
        }
      });
    }else{
      alert("Please Login to submit a review!!")
    }
    
  }
}