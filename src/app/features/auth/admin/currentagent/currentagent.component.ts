import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';
import Swal from 'sweetalert2';

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

  private showToast(icon: 'success' | 'error' | 'warning', title: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top', // Top center
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({ icon, title });
  }

  loadAgents(): void {
    this.agentservice.getAgents().subscribe({
      next: (data) => {

        this.agents = data;
        this.filterAgents = data;

        this.showToast('success', 'Agents loaded successfully');
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

      this.showToast('warning', 'Unable to suspend agent: ID is missing');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to suspend this agent? This action is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, suspend',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Suspending agent with ID:', id);
        this.agentservice.deleteAgent(id).subscribe({
          next: () => {
            this.agents = this.agents.filter(agent => this.getAgentId(agent) !== id);
            this.filterAgents = this.filterAgents.filter(agent => this.getAgentId(agent) !== id);
            this.showToast('success', 'Agent suspended successfully');
          }
        });
      }
    });
  }
}
