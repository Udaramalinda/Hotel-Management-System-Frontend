import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AgentService } from './agent.service';
import { API_BASE_URL } from './api.config';

describe('AgentService', () => {
  let service: AgentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, JwtModule],
      providers: [
        AgentService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      ],
    });

    service = TestBed.inject(AgentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send agent data and return a response', () => {
    const mockAgentData = {
      /* your mock agent data */
    };
    const mockResponse = {
      /* your mock response data */
    };

    service.postData(mockAgentData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/agent/register`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    req.flush(mockResponse);
  });

  it('should get agent details', () => {
    const mockResponse = {
      /* your mock agent details response data */
    };

    service.getAgentDetails().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_BASE_URL}/agent/details`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');

    req.flush(mockResponse);
  });

  it('should return true if the role is ADMIN', () => {
    const mockToken = 'mock.jwt.token'; // Replace with a valid JWT token

    spyOn(sessionStorage, 'getItem').and.returnValue(mockToken);
    const jwtHelper = TestBed.inject(JwtHelperService);
    spyOn(jwtHelper, 'decodeToken').and.returnValue({ role: 'ADMIN' });

    const result = service.getRole();

    expect(result).toBeTrue();
  });

  it('should return false if the role is not ADMIN', () => {
    const mockToken = 'mock.jwt.token'; // Replace with a valid JWT token

    spyOn(sessionStorage, 'getItem').and.returnValue(mockToken);
    const jwtHelper = TestBed.inject(JwtHelperService);
    spyOn(jwtHelper, 'decodeToken').and.returnValue({ role: 'USER' });

    const result = service.getRole();

    expect(result).toBeFalse();
  });

  it('should return null if no token is present', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const result = service.getRole();

    expect(result).toBeNull();
  });
});
