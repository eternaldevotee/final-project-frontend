import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = 'http://localhost:9090/Agents';
  private signupUrl = 'http://localhost:9090/signupRequests';
  
  getSignupRequests() {
    return this.http.get<any[]>(this.signupUrl);
  }

  approveRequest(id: string) {
    return this.http.patch<any>(`${this.signupUrl}/${id}`, { active: true });
  }
  updateUser(id: string, updatedData: any): Observable<any> {
    return this.http.patch<any>(`${this.signupUrl}/${id}`, updatedData);
  }
  rejectRequest(id: string) {
    return this.http.delete<any>(`${this.signupUrl}/${id}`);
  }

  constructor(private http: HttpClient) {}

  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteAgent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
