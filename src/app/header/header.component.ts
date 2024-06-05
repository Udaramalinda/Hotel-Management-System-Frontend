import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor ( private router: Router){
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    console.log('Logout Successfully.....!')
  }

}
