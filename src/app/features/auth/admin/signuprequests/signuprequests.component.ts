import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';
// toast import removed
// Swal import removed

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
        // Replaced toast.success
        alert('Signup requests loaded successfully');
      },
      error: (error) => {
        console.error('Error loading signup requests:', error);
        // Replaced toast.error
        alert('Failed to load signup requests');
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
    // Replaced Swal.fire with native confirm
    const confirmation = window.confirm(
      'Are you sure you want to approve this agent?'
    );

    if (confirmation) {
      this.agentService.approveRequest(id).subscribe({
        next: () => {
          this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
          this.filteredAgents = this.filteredAgents.filter(agent => this.getAgentId(agent) !== id);
          // Replaced toast.success
          alert('Agent approved successfully');
        },
        error: (error) => {
          console.error('Error approving agent:', error);
          // Replaced toast.error
          alert('Failed to approve agent');
        }
      });
    }
  }

  rejectAgent(id: string): void {
    // Replaced Swal.fire with native confirm
    const confirmation = window.confirm(
      'Are you sure you want to reject this agent?'
    );

    if (confirmation) {
      this.agentService.rejectRequest(id).subscribe({
        next: () => {
          this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
          this.filteredAgents = this.filteredAgents.filter(agent => this.getAgentId(agent) !== id);
          // Replaced toast.success
          alert('Agent rejected successfully');
        },
        error: (error) => {
          console.error('Error rejecting agent:', error);
          // Replaced toast.error
          alert('Failed to reject agent');
        }
      });
    }
  }
}