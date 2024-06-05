import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MarkupService } from './markup.service';
import { API_BASE_URL } from './api.config';

describe('MarkupService', () => {
  let service: MarkupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkupService],
    });

    service = TestBed.inject(MarkupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send markup data and return a response', () => {
    const mockMarkup = {};
    const mockResponse = {};

    service.postData(mockMarkup).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/markup/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });

  it('should get markup value and return a response', () => {
    const mockResponse = {};

    service.getMarkupValue().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_BASE_URL}/markup/value`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });
});
