import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  public addUser(user: User): Observable<any> {
    const response = this.http.post<any>('http://localhost:3000/api/auth/register', user);
    return response;
  }
  public connectUser(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', user).pipe(
      tap(response => {
        if (response.token) {
          this.authService.saveToken(response.token);
        }
      })
    );
  }

}
