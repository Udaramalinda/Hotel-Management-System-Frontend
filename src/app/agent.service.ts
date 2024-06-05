import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { API_BASE_URL } from './api.config';


@Injectable({
  providedIn: 'root'
})

export class AgentService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient, private jwtSupport: JwtHelperService) { }

  public postData(agent: any): Observable<any> {
    const url = `${this.apiUrl}/agent/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });

    return this.http.post<any>(url, agent, { headers });
  }

  public getAgentDetails(): Observable<any> {
    const url = `${this.apiUrl}/agent/details`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
    return this.http.get(url, { headers });
  }

  public getRole(): boolean | null {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      const afterDecode = this.jwtSupport.decodeToken(token);
      if (afterDecode.role === "ADMIN"){
        return true;
      }
      return false;
    }
    return null;
  }
  
}
