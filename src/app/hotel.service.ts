import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class HotelService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(hotel: any): Observable<any> {
    const url = `${this.apiUrl}/hotel/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.post<any>(url, hotel, { headers });
  }

  public getHotelNames(): Observable<any> {
    const url = `${this.apiUrl}/hotel/names`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.get(url, { headers });
  }

  public getHotelDetails(): Observable<any> {
    const url = `${this.apiUrl}/hotel/details`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.get(url, { headers });
  }
  
}
