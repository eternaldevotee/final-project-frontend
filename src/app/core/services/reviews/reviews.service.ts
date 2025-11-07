import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Review, ReviewEligibility } from '../../models/ReviewModel';



@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'http://localhost:9090/reviews';
  private reviews$ = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }


  // Fetches all data from the API and updates the BehaviorSubject
  loadInitialData() {

    return this.http.get<any[]>(this.apiUrl).subscribe({
      next: reviews => this.reviews$.next(reviews || []),
      error: () => this.reviews$.next([])
    });
  }

  checkEligibility(packageId: string): Observable<ReviewEligibility> {

    return this.http.get<ReviewEligibility>(`${this.apiUrl}/eligibility/${packageId}`);
  }

  // Base observable for all reviews
  getAllReviews(): Observable<Review[]> {
    return this.reviews$.asObservable();
  }

  // Filtered observable for published reviews
  getReviewsForPackage(packageId: string): Observable<Review[]> {
    return this.getAllReviews().pipe(
      map(list => list.filter(r => r.packageId === packageId && r.status === 'PUBLISHED'))
    );
  }

  // Filtered observable for pending reviews
  getPendingReviews(): Observable<Review[]> {
    return this.getAllReviews().pipe(map(list => list.filter(r => r.status === 'PENDING')));
  }

  // Send a POST request to create a new review
  createReview(review: Omit<Review, 'reviewId' | 'userName' | 'timestamp' | 'status' | 'agentResponse'>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review).pipe(
      tap(() => this.loadInitialData()) // Re-fetch all data after a successful post
    );
  }

  // Send a PATCH request to add an agent response
  respondToReview(reviewId: string, response: string): Observable<Review> {
    return this.http.patch<Review>(`${this.apiUrl}/${reviewId}`, { agentResponse: response }).pipe(
      tap(() => this.loadInitialData()) // Re-fetch all data after a successful patch
    );
  }

  // Send a PATCH request to change the review status
  moderateReview(reviewId: string, publish: boolean): Observable<Review> {
    const newStatus = publish ? 'PUBLISHED' : 'REJECTED';
    return this.http.patch<Review>(`${this.apiUrl}/${reviewId}`, { status: newStatus }).pipe(
      tap(() => this.loadInitialData()) // Re-fetch all data after a successful patch
    );
  }
}