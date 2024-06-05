import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelViewComponent } from './hotel-view/hotel-view.component'

@Component({
  selector: 'app-root',
  standalone: true,
  // ContractRegisterComponent add this component to below
  imports: [
    CommonModule, 
    RouterOutlet,
    LoginComponent,
    DashboardComponent,
    HotelViewComponent,
  ],
  
  //templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<div>
    <!-- <app-login></app-login> -->
    <!-- <app-dashboard></app-dashboard> -->
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent {
  title = 'Sun Travels';
}
