import { Component } from '@angular/core';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { AgentNotificationModel } from '../../../core/models/AgentNotificationModel';
import { NotificationServiceService } from '../../../core/services/notification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-notifications',
  standalone: false,
  templateUrl: './agent-notifications.component.html',
  styleUrl: './agent-notifications.component.css'
})
export class AgentNotificationsComponent {

  constructor(private shareLoginService : ShareloginService , private agentNotificationService : NotificationServiceService , private router : Router){}

  notifications! : AgentNotificationModel[];

  ngOnInit() : void {
    const adminID = this.shareLoginService.getUserId();
    this.agentNotificationService.getNotifications(adminID).subscribe((data) => {
      this.notifications = data;
    });
  }
  
  goBack() : void {
    this.router.navigate(['/agent/home']);
  }
}
