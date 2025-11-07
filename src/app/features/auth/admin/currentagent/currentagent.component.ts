import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';
// NOTE: Swal import is removed as we are no longer using SweetAlert2
// import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-currentagent',
  standalone: false,
  templateUrl: './currentagent.component.html',
  styleUrl: './currentagent.component.css',
})
export class CurrentagentComponent implements OnInit {
  constructor(private agentservice: AgentService) { }

  agents!: any[];
  filterAgents!: any[];

  ngOnInit(): void {
    this.loadAgents();
  }

    // Private showToast method is removed as we are using native alert()
    // private showToast(icon: 'success' | 'error' | 'warning', title: string): void {
    //   // ... SweetAlert2 code removed ...
    // }

  loadAgents(): void {
    this.agentservice.getAgents().subscribe({
      next: (data) => {

        this.agents = data;
        this.filterAgents = data;

        // ⭐ SUCCESS ALERT: Replaced showToast('success', ...) with native alert
        alert('Agents loaded successfully');
      },
      // IMPORTANT: Added an error handler to loadAgents to provide user feedback
      error: (err) => {
          console.error('Failed to load agents:', err);
          alert('Failed to load agents. Please check the network.');
      }
    });
  }

  searchAgents(search: string) {
    if (!search) {
      this.filterAgents = this.agents;
    } else {
      this.filterAgents = this.agents.filter((agnt) =>
        (agnt.name || '').toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  getAgentId(agent: any): string {
    return agent.id ?? agent.userId ?? agent.userID ?? agent.agentId ?? agent.user_id ?? '';
  }

  deleteAgent(id: string): void {
    if (!id || id === '') {
      // ⭐ WARNING ALERT: Replaced showToast('warning', ...) with native alert
      alert('Warning: Unable to suspend agent: ID is missing');
      return;
    }

    const isConfirmed = window.confirm(
        'Are you sure you want to suspend this agent? This action is irreversible.'
    );
    
    if (isConfirmed) {
        console.log('Suspending agent with ID:', id);
        this.agentservice.deleteAgent(id).subscribe({
            next: () => {
                this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
                this.filterAgents = this.filterAgents.filter(agent => this.getAgentId(agent) !== id);
                
                alert('Agent suspended successfully');
            },
            error: (err) => {
                console.error('Failed to suspend agent:', err);
                alert('Suspension failed. Please try again.');
            }
        });
    }
  }
}