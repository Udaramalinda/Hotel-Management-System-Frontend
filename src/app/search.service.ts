import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(searchData: any): Observable<any> {
    const url = `${this.apiUrl}/search`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });

    return this.http.post(url, searchData, { headers });
  }

}
