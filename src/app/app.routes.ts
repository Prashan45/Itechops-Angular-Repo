import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmplyeeDashboardComponent } from './components/emplyee-dashboard/emplyee-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'emplyee-dashboard', component: EmplyeeDashboardComponent },
];
