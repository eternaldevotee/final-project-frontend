import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private baseUrl = 'http://localhost:9090/admin';

  constructor(private http: HttpClient) {}

  // Utility to get headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // =======================
  // PENDING AGENTS (SIGNUP REQUESTS)
  // =======================
  getSignupRequests(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/pendingagents/all`, { headers });
  }

  approveRequest(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    // Backend uses PUT, not PATCH
    return this.http.put(`${this.baseUrl}/pendingagents/all/${id}`, {}, { headers, responseType: 'text' });
  }

  rejectRequest(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/pendingagents/all/${id}`, { headers, responseType: 'text' });
  }

  // =======================
  // CURRENT AGENTS
  // =======================
  getAgents(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/currentagents/all`, { headers });
  }

  deleteAgent(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    // Backend endpoint is /admin/currentagents/{id}, NOT /admin/currentagents/all/{id}
    return this.http.delete(`${this.baseUrl}/currentagents/${id}`, { headers, responseType: 'text' });
  }
}
