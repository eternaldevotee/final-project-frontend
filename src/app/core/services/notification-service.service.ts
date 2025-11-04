import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentNotificationModel } from '../models/AgentNotificationModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private baseUrl  = "http://localhost:8080/agent/notifications";
  constructor(private http : HttpClient) { }

  getNotifications(agentId : string) : Observable<AgentNotificationModel[]> {
    return this.http.get<AgentNotificationModel[]>(`${this.baseUrl}/${agentId}`);
  }
}
