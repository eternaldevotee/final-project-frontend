import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssistanceRequestDTO } from '../models/Requests/AssistanceRequestDTO';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerAssistanceService {
  private baseUrl = 'http://localhost:9090/customer/assistancerequest/create';
 
  constructor(private http: HttpClient) {}
 
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
 
  createAssistanceRequest(userId: string, issue: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const requestBody: AssistanceRequestDTO = {
      userId: userId,
      issueDescription: issue
    } as any;
 
    return this.http.post(this.baseUrl, requestBody, { headers });
  }
}