import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) { }

  public postData(contract: any): Observable<any> {
    const url = `${this.apiUrl}/contract/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.post<any>(url, contract, { headers });
  }

  public getContract(hotelName: any): Observable<any> {
    const url = `${this.apiUrl}/contract/details`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.post(url, hotelName, { headers });

  }
  
}
