import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class MarkupService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(markup: any): Observable<any> {
    const url = `${this.apiUrl}/markup/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.post<any>(url, markup, { headers });
  }

  public getMarkupValue(): Observable<any> {
    const url = `${this.apiUrl}/markup/value`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.get(url, { headers });
  }
  
}
