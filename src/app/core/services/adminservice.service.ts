import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private packageApiUrl = 'http://localhost:9090/public/packages';
  private assistanceApiUrl = 'http://localhost:9090/admin';

  constructor(private http: HttpClient) {}

  // Package methods
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.packageApiUrl);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete(`${this.packageApiUrl}/${id}`);
  }

  // Assistance request methods
  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.assistanceApiUrl}/assistancerequests/all`);
  }

  closeRequest(reqId: string): Observable<string> {
    return this.http.post(
      `${this.assistanceApiUrl}/assistancerequests/close/${reqId}`,
      null,
      { responseType: 'text' }
    );
  }

  adminReply(reqId: string, reply: string): Observable<string> {
    const encodedReply = encodeURIComponent(reply);
    return this.http.post(
      `${this.assistanceApiUrl}/assistancerequests/${reqId}/${encodedReply}`,
      null,
      { responseType: 'text' }
    );
  }
}
