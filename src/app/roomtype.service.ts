import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class RoomTypeService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(roomtype: any): Observable<any> {
    const url = `${this.apiUrl}/roomtype/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });

    return this.http.post<any>(url, roomtype, { headers });
  }

  public getRoomTypeNames(): Observable<any> {
    const url = `${this.apiUrl}/roomtype/names`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.get(url, {headers});
  }
  
}
