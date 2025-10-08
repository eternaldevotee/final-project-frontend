import { TestBed } from '@angular/core/testing';
import { SearchserviceService } from './searchservice.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TravelPackageModel } from '../../models/TravelPackageModel';




fdescribe('SearchserviceService', () => {
  let service: SearchserviceService;
  let httpMock: HttpTestingController;

  const mockPackages: TravelPackageModel[] = [
    {
      PackageID: 1,
      Title: 'Beach Paradise',
      Description: 'Relax on the beach',
      DetailedDescription: 'Enjoy 3 days of sun, sand, and sea in Goa.',
      Duration: '3 Days',
      Price: 5000,
      IncludedServices: ['Hotel', 'Meals', 'Transport'],
      ImageSrc: 'beach.jpg',
      id: 'pkg001',
      Location: 'Goa'
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchserviceService]
    });

    service = TestBed.inject(SearchserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all travel packages', () => {
    service.getAllData().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(mockPackages);
    });

    const req = httpMock.expectOne('http://localhost:3000/TravelPackage');
    expect(req.request.method).toBe('GET');
    req.flush(mockPackages);
  });

});