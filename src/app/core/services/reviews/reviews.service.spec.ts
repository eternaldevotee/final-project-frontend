
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewsService } from './reviews.service';
import { take } from 'rxjs';
import { Review, ReviewEligibility } from '../../models/ReviewModel';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  // Mock data to be used in tests
  const mockReviews: Review[] = [
    { reviewId: '1', userId: 'u1', userName: 'User A', packageId: 'pkg1', rating: 5, comment: 'Great!', timestamp: new Date().toISOString(), status: 'PUBLISHED', agentResponse: 'Thanks!' },
    { reviewId: '2', userId: 'u2', userName: 'User B', packageId: 'pkg1', rating: 4, comment: 'Good.', timestamp: new Date().toISOString(), status: 'PENDING' },
    { reviewId: '3', userId: 'u3', userName: 'User C', packageId: 'pkg2', rating: 1, comment: 'Bad.', timestamp: new Date().toISOString(), status: 'PUBLISHED' },
    { reviewId: '4', userId: 'u4', userName: 'User D', packageId: 'pkg1', rating: 2, comment: 'Meh.', timestamp: new Date().toISOString(), status: 'REJECTED' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewsService]
    });
    service = TestBed.inject(ReviewsService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = (service as any).apiUrl; // Access private property for testing

    // The service constructor calls loadInitialData().
    // We must flush this initial request in our setup.
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockReviews);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should createq', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data on creation and populate the BehaviorSubject', (done) => {
    // This is tested by the beforeEach, but we add an explicit check
    service.getAllReviews().pipe(take(1)).subscribe(reviews => {
      expect(reviews).toEqual(mockReviews);
      done();
    });
  });

  it('getReviewsForPackage(packageId) should return only PUBLISHED reviews for that package', (done) => {
    service.getReviewsForPackage('pkg1').pipe(take(1)).subscribe(reviews => {
      expect(reviews.length).toBe(1);
      expect(reviews[0].reviewId).toBe('1');
      expect(reviews[0].status).toBe('PUBLISHED');
      expect(reviews[0].packageId).toBe('pkg1');
      done();
    });
  });

  it('getPendingReviews() should return only PENDING reviews', (done) => {
    service.getPendingReviews().pipe(take(1)).subscribe(reviews => {
      expect(reviews.length).toBe(1);
      expect(reviews[0].reviewId).toBe('2');
      expect(reviews[0].status).toBe('PENDING');
      done();
    });
  });

  it('checkEligibility(packageId) should make a GET request', (done) => {
    const mockEligibility: ReviewEligibility = { eligible: true };
    const packageId = 'pkg123';

    service.checkEligibility(packageId).subscribe(response => {
      expect(response).toEqual(mockEligibility);
      done();
    });

    const req = httpMock.expectOne(`${apiUrl}/eligibility/${packageId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEligibility);
  });

  it('createReview(review) should POST the review and reload data', () => {
    const newReviewPayload: Omit<Review, 'reviewId' | 'userName' | 'timestamp' | 'status' | 'agentResponse'> = {
      userId: 'u5',
      packageId: 'pkg3',
      rating: 5,
      comment: 'Awesome!'
    };
    const mockPostedReview: Review = { ...newReviewPayload, reviewId: '5', userName: 'User E', timestamp: new Date().toISOString(), status: 'PENDING' };

    service.createReview(newReviewPayload).subscribe();

    // 1. Expect the POST request
    const postReq = httpMock.expectOne(apiUrl);
    expect(postReq.request.method).toBe('POST');
    expect(postReq.request.body).toEqual(newReviewPayload);
    postReq.flush(mockPostedReview);

    // 2. Expect the GET request from loadInitialData()
    const getReq = httpMock.expectOne(apiUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(mockReviews); // Flush the reload
  });

  it('respondToReview(id, response) should PATCH the review and reload data', () => {
    const reviewId = '2'; // The pending review
    const responseText = 'Thank you for your feedback.';

    service.respondToReview(reviewId, responseText).subscribe();

    // 1. Expect the PATCH request
    const patchReq = httpMock.expectOne(`${apiUrl}/${reviewId}`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ agentResponse: responseText });
    patchReq.flush({ ...mockReviews[1], agentResponse: responseText });

    // 2. Expect the GET request from loadInitialData()
    const getReq = httpMock.expectOne(apiUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(mockReviews);
  });

  it('moderateReview(id, true) should PATCH status to PUBLISHED and reload data', () => {
    const reviewId = '2'; // The pending review

    service.moderateReview(reviewId, true).subscribe();

    // 1. Expect the PATCH request
    const patchReq = httpMock.expectOne(`${apiUrl}/${reviewId}`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ status: 'PUBLISHED' });
    patchReq.flush({ ...mockReviews[1], status: 'PUBLISHED' });

    // 2. Expect the GET request from loadInitialData()
    const getReq = httpMock.expectOne(apiUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(mockReviews);
  });

  it('moderateReview(id, false) should PATCH status to REJECTED and reload data', () => {
    const reviewId = '2'; // The pending review

    service.moderateReview(reviewId, false).subscribe();

    // 1. Expect the PATCH request
    const patchReq = httpMock.expectOne(`${apiUrl}/${reviewId}`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ status: 'REJECTED' });
    patchReq.flush({ ...mockReviews[1], status: 'REJECTED' });

    // 2. Expect the GET request from loadInitialData()
    const getReq = httpMock.expectOne(apiUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(mockReviews);
  });
});