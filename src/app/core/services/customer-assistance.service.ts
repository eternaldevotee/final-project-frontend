import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssistanceRequestDTO } from '../models/Requests/AssistanceRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerAssistanceService {
  private baseUrl = 'http://localhost:9090/customer';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createAssistanceRequest(userId: string, issue: string): Observable<any> {

    console.log(userId,issue);
    const headers = this.getAuthHeaders();
    const requestBody: AssistanceRequestDTO = {
      userId: userId,
      issue: issue
    };
    return this.http.post(`${this.baseUrl}/assistance/request/create`, requestBody, { headers });
  }
}

