import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-emplyee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './emplyee-dashboard.component.html',
  styleUrls: ['./emplyee-dashboard.component.css']
})
export class EmplyeeDashboardComponent implements OnInit {
  newusers: any[] = [];
  users: any[] = [];
  errorMessage: string = '';
  showForm: boolean = false;
  showDetails: boolean = false; // Add this line
  newUser: any = { name: '', contact: '', email: '', profilePicture: null };
  selectedUser: any = null;

  constructor(private userService: UserService, private signupService: SignupService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getEmployees().subscribe(
      users => {
        this.users = users;
        this.newusers = users;  
      },
      error => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users. Please try again later.';
      }
    );
  }

  showUserDetails(user: any): void {
    this.selectedUser = user;
    this.showDetails = true;
  }

  backToTable(): void {
    this.selectedUser = null;
    this.showDetails = false;
  }
}
