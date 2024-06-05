import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HotelService } from './hotel.service';
import { API_BASE_URL } from './api.config';

describe('HotelService', () => {
  let service: HotelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService],
    });

    service = TestBed.inject(HotelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send hotel data and return a response', () => {
    const mockHotel = {};
    const mockResponse = {};

    service.postData(mockHotel).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/hotel/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });

  it('should get hotel names and return a response', () => {
    const mockResponse = {};

    service.getHotelNames().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_BASE_URL}/hotel/names`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });

  it('should get hotel details and return a response', () => {
    const mockResponse = {};

    service.getHotelDetails().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/hotel/details`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });
});
