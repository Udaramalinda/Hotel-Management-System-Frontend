import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RoomTypeService } from './roomtype.service';
import { API_BASE_URL } from './api.config';

describe('RoomTypeService', () => {
  let service: RoomTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomTypeService],
    });

    service = TestBed.inject(RoomTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send roomtype data and return a response', () => {
    const mockRoomType = {};
    const mockResponse = {};

    service.postData(mockRoomType).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/roomtype/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });

  it('should get roomtype names and return a response', () => {
    const mockResponse = {};

    service.getRoomTypeNames().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/roomtype/names`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer ' + sessionStorage.getItem('access_token')
    );

    req.flush(mockResponse);
  });
});
