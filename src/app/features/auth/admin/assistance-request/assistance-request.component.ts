import { AdminserviceService } from './../../../../core/services/adminservice.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-assistance',
  standalone: false,
  templateUrl: './assistance-request.component.html',
  styleUrl: './assistance-request.component.css'
})
export class AssistanceRequestComponent implements OnInit {
  requests: any[] = [];
 
  constructor(private adminService: AdminserviceService) {}
 
  ngOnInit(): void {
    this.loadRequests();
  }
 
  onReplyInput(event: any, requestId: string): void {
    // This method helps trigger change detection for the button disabled state
  }
 
  loadRequests(): void {
    console.log('Fetching requests from: http://localhost:9090/admin/assistancerequests/all');
    this.adminService.getAllRequests().subscribe({
      next: (data) => {
        console.log('Received requests:', data);
        this.requests = data;
        if (data.length === 0) {
          console.warn('No assistance requests found in the database');
        }
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
        alert(`Failed to load requests: ${error.message || 'Server error'}. Make sure backend is running on http://localhost:9090`);
      }
    });
  }
 
  closeRequest(reqId: string): void {
    console.log('Closing request:', reqId);
    console.log('API URL:', `http://localhost:9090/admin/assistancerequests/close/${reqId}`);
 
    this.adminService.closeRequest(reqId).subscribe({
      next: (response) => {
        console.log('Close response:', response);
        alert('Request closed successfully!');
        this.loadRequests();
      }
    });
  }
 
  adminReply(reqId: string, reply: string): void {
    if (!reply || reply.trim() === '') {
      alert('Please enter a reply message');
      return;
    }
 
    this.adminService.adminReply(reqId, reply).subscribe({
      next: (response) => {
        alert('Reply sent successfully! Request will be closed.');
 
        // Automatically close the request after sending reply
        this.adminService.closeRequest(reqId).subscribe({
          next: (closeResponse) => {
            this.loadRequests();
          },
          error: (closeError) => {
            this.loadRequests();
          }
        });
      },
      error: (error) => {
        alert('Failed to send reply. Please try again.');
      }
    });
  }
}
 
 