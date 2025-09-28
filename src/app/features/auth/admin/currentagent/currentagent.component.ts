import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../../core/services/agents.service';

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
    this.agentservice.getAgents().subscribe(data => {
      this.agents = data;
      this.filterAgents = data;
    });


  }


  searchAgents(search: string) {
    if (!search) {
      this.filterAgents = this.agents;
    }
    

    else {
      this.filterAgents = this.agents.filter((agnt) =>
        agnt.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
  deleteAgent(id: number): void {
    if (confirm('Are you sure you want to suspend this agent? This is irreversible.')) {
      this.agentservice.deleteAgent(id).subscribe(() => {
        this.agents = this.agents.filter(agent => agent.id !== id);
        this.filterAgents = this.filterAgents.filter(agent => agent.id !== id);
        console.log(`Agent with ID ${id} suspended.`);
      });
    }
  }
}
