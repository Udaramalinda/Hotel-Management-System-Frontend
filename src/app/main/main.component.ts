import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

import { SearchRoomsComponent } from '../search-rooms/search-rooms.component';
import { HotelRegisterComponent } from '../hotel-register/hotel-register.component';
import { RoomTypeRegisterComponent } from '../roomtype-register/roomtype-register.component';
import { ContractRegisterComponent } from '../contract-register/contract-register.component';
import { MarkupRegisterComponent } from '../markup-register/markup-register.component';
import { AgentRegisterComponent } from '../agent-register/agent-register.component';
import { HotelViewComponent } from '../hotel-view/hotel-view.component';
import { AgentViewComponent } from '../agent-view/agent-view.component';
import { ContractViewComponent } from '../contract-view/contract-view.component';
import { RoomtypeMarkupViewComponent } from '../roomtype-markup-view/roomtype-markup-view.component';

import { AgentService } from '../agent.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    SearchRoomsComponent,
    HotelRegisterComponent,
    RoomTypeRegisterComponent,
    ContractRegisterComponent,
    MarkupRegisterComponent,
    AgentRegisterComponent,
    HotelViewComponent,
    AgentViewComponent,
    ContractViewComponent,
    RoomtypeMarkupViewComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements AfterViewInit {
  @ViewChildren(HotelViewComponent)
  hotelViewComponent!: QueryList<HotelViewComponent>;
  @ViewChildren(AgentViewComponent)
  agentViewComponent!: QueryList<AgentViewComponent>;
  @ViewChildren(RoomtypeMarkupViewComponent)
  roomtypeMarkupViewComponent!: QueryList<RoomtypeMarkupViewComponent>;

  isAdmin: boolean | null = null;

  constructor(private agentService: AgentService) {}

  ngAfterViewInit(): void {}

  onHotelViewTabClick(event: number) {
    if (event === 2) {
      console.log('function Called for hotel');
      this.hotelViewComponent.forEach((hotelView) => {
        hotelView.getData();
      });
    } else if (event === 9) {
      console.log('function Called for agent');
      this.agentViewComponent.forEach((agentView) => {
        agentView.getAgents();
      });
    } else if (event === 7) {
      console.log('function Called for roomtypes');
      this.roomtypeMarkupViewComponent.forEach((roomtypeMarkupView)=>{
        roomtypeMarkupView.getRoomTypeMarkup();
      })
    }
  }
  ngOnInit() {
    this.isAdmin = this.agentService.getRole();
  }
}

