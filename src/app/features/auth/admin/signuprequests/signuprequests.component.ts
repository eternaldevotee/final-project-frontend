import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';

@Component({
  selector: 'app-singuprequests',
  standalone: false,
  templateUrl: './signuprequests.component.html',
  styleUrl: './signuprequests.component.css',
})
export class SignuprequestsComponent implements OnInit {
  agents!: any[];
  filteredAgents!: any[];

  constructor(private agentservice: AgentService) {}
  ngOnInit(): void {
    this.agentservice.getSignupRequests().subscribe((data) => {
      this.agents = data;
      this.filteredAgents = data;
    });
  }
  searchAgents(search: string) {
    if (!search) {
      this.filteredAgents = this.agents;
    } else {
      this.filteredAgents = this.agents.filter((agent) =>
        agent.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  approveAgent(id: string) {
    this.agentservice.approveRequest(id).subscribe(() => {
      alert("Agent has been approved");
      this.ngOnInit();
    });
  }

  rejectAgent(id: string) {
    this.agentservice.rejectRequest(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
