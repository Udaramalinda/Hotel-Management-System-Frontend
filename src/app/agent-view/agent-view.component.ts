import { Component, AfterViewInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AgentService } from '../agent.service';

export interface UserData{
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-agent-view',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
  ],
  templateUrl: './agent-view.component.html',
  styleUrl: './agent-view.component.css'
})
export class AgentViewComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();

  
  constructor(private agentService: AgentService ) {
    // const hotelDetails = hotelService.getHotelDetails();
    this.getAgents();

  }

  getAgents(){
    this.agentService.getAgentDetails().subscribe(
      (response: UserData[]) => {
        //console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
        console.error('Error fetching hotel details', error);
      }
    );
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
