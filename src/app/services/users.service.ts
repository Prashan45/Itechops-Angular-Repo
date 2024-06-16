import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7136/api/User/admin';
  private employeeApiUrl = 'https://localhost:7136/api/User/employee';
  private editurl = 'https://localhost:7136/api/User';

  private timeout = 60000; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers })
      .pipe(
        timeout(this.timeout),
        catchError(error => {
          console.error('Request timed out', error);
          return throwError(error);
        })
      );
  }

  getEmployees(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.employeeApiUrl, { headers })
      .pipe(
        timeout(this.timeout),
        catchError(error => {
          console.error('Request timed out', error);
          return throwError(error);
        })
      );
  }

  updateUser(id: number, user: any): Observable<any> {
    debugger
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.editurl}/${id}`, user, { headers })
      .pipe(
        timeout(this.timeout),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
  }
}
