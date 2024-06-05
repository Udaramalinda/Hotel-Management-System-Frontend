import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ContractService } from './contract.service';
import { API_BASE_URL } from './api.config';

describe('ContractService', () => {
  let service: ContractService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContractService],
    });

    service = TestBed.inject(ContractService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send contract data and return a response', () => {
    const mockContract = {};
    const mockResponse = {};

    service.postData(mockContract).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/contract/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });

  it('should get contract details and return a response', () => {
    const mockHotelName = 'YourHotelName';
    const mockResponse = {};

    service.getContract(mockHotelName).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/contract/details`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });
});
