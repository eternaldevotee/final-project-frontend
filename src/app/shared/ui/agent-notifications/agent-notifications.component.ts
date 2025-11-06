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
  filteredNotifications! : AgentNotificationModel[];
  selectedAction : string = '';
  pkgId! : string;

  getTypeColor(type : string) : string {
    switch (type.toLowerCase()) {
      case 'create' :
        return 'green';
      case 'update' :
        return 'orange';
      case 'delete' :
        return 'red';
      default:
        return 'grey';
    }
  }

  ngOnInit() : void {
    const adminID = this.shareLoginService.getUserId();
    this.agentNotificationService.getNotifications(adminID).subscribe((data) => {
      this.notifications = data;
      this.filteredNotifications = data;
    });
  }
  
  applyFilters() : void {
    if(!this.selectedAction) {
      this.filteredNotifications = this.notifications;
    }
    else {
      console.log("hey in the else block")
      this.filteredNotifications = this.notifications.filter(n => n.type.toLocaleLowerCase() === this.selectedAction.toLocaleLowerCase());
      console.log(this.filteredNotifications)
    }
  }

  goBack() : void {
    this.router.navigate(['/agent/home']);
  }

  filterById() : void {
    console.log("in filter by id method")
    this.filteredNotifications = this.notifications.filter(n => n.message.includes(this.pkgId))
    console.log(this.filteredNotifications)
  }
}
