import { Component, OnInit } from '@angular/core';
import { CustomerAssistanceService } from '../../core/services/customer-assistance.service';
import { ShareloginService } from '../../core/services/loginstate/sharelogin.service';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-customer-assistance',
  standalone: false,
  templateUrl: './customer-assistance.component.html',
  styleUrl: './customer-assistance.component.css'
})
export class CustomerAssistanceComponent implements OnInit {
  issue: string = '';
  isSubmitting: boolean = false;
  userName: string = '';
 
  constructor(
    private customerAssistanceService: CustomerAssistanceService,
    private shareloginService: ShareloginService
  ) {}
 
  ngOnInit(): void {
    this.userName = this.shareloginService.getName() || 'User';
  }
 
  onSubmit(): void {
    if (!this.issue.trim()) {
      alert('Please describe your issue before submitting.');
      return;
    }
 
    this.isSubmitting = true;
    const userId = this.shareloginService.getUserId();
 
    this.customerAssistanceService.createAssistanceRequest(userId, this.issue).subscribe({
      next: (response) => {
        alert('Your assistance request has been submitted successfully! Our team will respond shortly.');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error submitting assistance request:', err);
        alert('Failed to submit your request. Please try again.');
        this.isSubmitting = false;
      }
    });
  }
 
  resetForm(): void {
    this.issue = '';
  }
 
  get characterCount(): number {
    return this.issue.length;
  }
}