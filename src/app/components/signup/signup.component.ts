import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  contact: string = '';
  email: string = '';
  password: string = '';
  profilePicture: File | null = null;
  errorMessage: string = '';

  constructor(private signupService: SignupService, private router: Router) { }

  onFileSelected(event: any) {
    this.profilePicture = event.target.files[0];
  }

  signup() {
    debugger;
    if (this.profilePicture) {
      this.signupService.signup(this.name, this.contact, this.email, this.password, this.profilePicture).subscribe(
        data => {
          this.router.navigate(['/login']); 
        },
        error => {
          this.errorMessage = 'Error occurred during signup';
        }
      );
    } else {
      this.errorMessage = 'Profile picture is required';
    }
  }
}
