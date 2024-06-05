import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(login: any): Observable<any> {
    const url = `${this.apiUrl}/agent/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(url, login, { headers });
  }
  
}
