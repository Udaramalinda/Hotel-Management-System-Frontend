import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
  },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Login' },

  {
    path: '**',
    component: ErrorPageComponent,
    title: 'Not Found'
  }
];
