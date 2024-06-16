import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { SignupService } from '../../services/signup.service';

@Component({
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  newusers: any[] = [];
  users: any[] = [];
  errorMessage: string = '';
  showForm: boolean = false;
  newUser: any = { id: null, name: '', contact: '', email: '', profilePicture: null };
  editingUser: any = null;

  constructor(private userService: UserService, private signupService: SignupService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
        this.newusers = users;  
      },
      (error: any) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Failed to load users. Please try again later.';
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newUser = { id: null, name: '', contact: '', email: '', profilePicture: null };
    this.editingUser = null;
  }

  addUser(): void {
    if (this.newUser.profilePicture) {
      this.signupService.signup(this.newUser.name, this.newUser.contact, this.newUser.email, this.newUser.password, this.newUser.profilePicture)
        .subscribe(
          (data: any) => {
            this.newusers.push({ ...this.newUser });
            this.newUser = { id: null, name: '', contact: '', email: '', profilePicture: null };
            this.toggleForm();
          },
          (error: any) => {
            this.errorMessage = 'Error occurred during signup';
          }
        );
    } else {
      this.errorMessage = 'Profile picture is required';
    }
  }

  editUser(user: any): void {
    debugger
    // Ensure user has a unique identifier, or use the index temporarily
    const index = this.users.findIndex(u => u === user);
    if (index !== -1) {
      // Create editingUser with the user properties
      this.editingUser = { ...this.users[index] };
      
      // If user doesn't have an id, you can use the index as a temporary identifier
      this.newUser = {
        id: index, // Temporary identifier
        name: this.users[index].name,
        contact: this.users[index].contact,
        email: this.users[index].email,
        profilePicture: this.users[index].profilePicture // Assuming user object has profilePicture property
      };
      
      this.showForm = true; // Show the form for editing
    } else {
      console.error('User not found in the list');
      this.errorMessage = 'User not found in the list';
    }
  }
  
  updateUser(): void {
    debugger
    if (this.newUser.id) { // Ensure newUser has an ID
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe(
        (updatedUser: any) => {
          const index = this.newusers.findIndex(u => u.id === this.newUser.id);
          if (index !== -1) {
            this.newusers[index] = updatedUser;
          }
          this.toggleForm();
        },
        (error: any) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error occurred during update';
        }
      );
    } else {
      console.error('Editing user does not have a valid ID');
      this.errorMessage = 'Editing user does not have a valid ID';
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.newUser = { id: null, name: '', contact: '', email: '', profilePicture: null };
    this.showForm = false;
  }

  onFileChange(event: any): void {
    this.newUser.profilePicture = event.target.files[0];
  }
}
