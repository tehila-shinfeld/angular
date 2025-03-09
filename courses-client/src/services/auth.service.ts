import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  myToken: string | null = this.getToken();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // =======================================================================

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.tokenKey, token);
      this.myToken = token; // עדכון המשתנה myToken
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem(this.tokenKey);
      console.log('token', token);
      return token;
    }
    console.log('no token');
    return null;
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.tokenKey);
    }
  }
  
  // public createCourse(title: string, description: string, teacherId: number): Observable<any> {
  //   const token = sessionStorage.getItem('authToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const body = { title, description, teacherId };
  //   return this.http.post<any>(`${this.apiUrl}/courses`, body, { headers });
  // }

  getUserId(): string | null {
    console.log("in getUserId");
    if (!this.myToken) {
      this.myToken = this.getToken(); // נסה לטעון את הטוקן אם הוא לא מוגדר
      if (!this.myToken) {
        return null;
      }
    }
    try {
      const payload = JSON.parse(atob(this.myToken.split('.')[1])); // מפענח את ה- payload
      console.log('payload', payload);

      return payload.userId || null; // מחזיר את userId אם קיים
    } 
    catch (error) {
      console.error('Invalid token-----בפונקציה: getUserId', error);
      return null;
    }
    return null;
  }
}