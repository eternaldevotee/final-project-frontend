import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../models/Reposonse/CustomerResponse';


@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private packageApiUrl = 'http://localhost:9090/admin/packages';
  private assistanceApiUrl = 'http://localhost:9090/admin';
  private customerApiUrl = 'http://localhost:9090/admin/customers';

  constructor(private http: HttpClient) {}

  // Utility to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.packageApiUrl);
  }

  deletePackage(id: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.packageApiUrl}/${id}`, { headers, responseType: 'text' });
  }

  getAllRequests(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.assistanceApiUrl}/assistancerequests/all`, { headers });
  }

  closeRequest(reqId: string): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.assistanceApiUrl}/assistancerequests/all/${reqId}`,
      {},
      { headers, responseType: 'text' }
    );
  }

  adminReply(reqId: string, reply: string): Observable<string> {
    const encodedReply = encodeURIComponent(reply);
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.assistanceApiUrl}/assistancerequests/${reqId}/${encodedReply}`,
      {},
      { headers, responseType: 'text' }
    );
  }




  suspendCustomer(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.customerApiUrl}/${userId}/suspend`,
      {},
      { headers, responseType: 'text' }
    );
  }
}
