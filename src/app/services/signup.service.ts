import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl = 'https://localhost:7136/api/Signup/SaveData'; 

  constructor(private http: HttpClient) { }

  signup(name: string, contact: string, email: string, password: string, profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Contact', contact);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('ProfilePicture', profilePicture);
    
    return this.http.post<any>(this.signupUrl, formData);
  }
}
