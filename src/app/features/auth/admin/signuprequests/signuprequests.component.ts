import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';
import { toast } from 'ngx-sonner'; // ✅ ngx-sonner for toasts
import Swal from 'sweetalert2';     // ✅ SweetAlert2 for confirmation

@Component({
  selector: 'app-signuprequests',
  standalone: false,
  templateUrl: './signuprequests.component.html',
  styleUrl: './signuprequests.component.css',
})
export class SignupRequestsComponent implements OnInit {
  constructor(private agentService: AgentService) {}

  agents!: any[];
  filteredAgents!: any[];

  ngOnInit(): void {
    this.loadSignupRequests();
  }

  loadSignupRequests(): void {
    this.agentService.getSignupRequests().subscribe({
      next: (data) => {
        this.agents = data;
        this.filteredAgents = data;
        toast.success('✅ Signup requests loaded successfully');
      },
      error: (error) => {
          toast.error('❌ Failed to load signup requests');
      }
    });
  }

  searchAgents(search: string): void {
    if (!search) {
      this.filteredAgents = this.agents;
    } else {
      this.filteredAgents = this.agents.filter((req) =>
        (req.name || '').toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  getAgentId(agent: any): string {
    return agent.id ?? agent.userId ?? agent.userID ?? agent.agentId ?? agent.user_id ?? '';
  }

  approveAgent(id: string): void {
    Swal.fire({
      title: 'Approve Agent?',
      text: 'Are you sure you want to approve this agent?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agentService.approveRequest(id).subscribe({
          next: () => {
            this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
            this.filteredAgents = this.filteredAgents.filter(agent => this.getAgentId(agent) !== id);
            toast.success('✅ Agent approved successfully');
          },
          error: (error) => {

            toast.error('❌ Failed to approve agent');
          }
        });
      }
    });
  }

  rejectAgent(id: string): void {
    Swal.fire({
      title: 'Reject Agent?',
      text: 'Are you sure you want to reject this agent?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agentService.rejectRequest(id).subscribe({
          next: () => {
            this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
            this.filteredAgents = this.filteredAgents.filter(agent => this.getAgentId(agent) !== id);
            toast.success('🚫 Agent rejected successfully');
          },
          error: (error) => {

            toast.error('❌ Failed to reject agent');
          }
        });
      }
    });
  }
}
