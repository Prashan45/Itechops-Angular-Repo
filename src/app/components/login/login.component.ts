// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        if (data.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (data.role === 'Employee') {
          this.router.navigate(['/emplyee-dashboard']);
        } else {
          this.router.navigate(['/default-dashboard']);
        }
      },
      error => {
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }
}
