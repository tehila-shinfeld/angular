import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public gxetAllCourses(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:3000/api/courses', { headers });
  }
  public getCourseDetails(courseId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:3000/api/courses/${courseId}`, { headers });
  }
  public enrollInCourse(courseId: number, userId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:3000/api/courses/${courseId}/enroll`, { userId }, { headers });
  }
  public unenrollFromCourse(courseId: number, userId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}/unenroll`, { headers, body: { userId } });
  }
  public getCourseLessons(courseId: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:3000/api/courses/${courseId}/lessons`, { headers });
  }

  public createCourse(title: string, description: string, teacherId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { title, description, teacherId };
    return this.http.post<any>(`http://localhost:3000/api/courses`, body, { headers });
  }
  public deleteCourse(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}`, { headers });
  }
  public updateCourse(courseId: number, title: string, description: string, teacherId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { title, description, teacherId };
    return this.http.put<any>(`${this.apiUrl}/courses/${courseId}`, body, { headers });
  }
  public createLesson(courseId: number, title: string, content: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { title, content, courseId };
    return this.http.post<any>(`${this.apiUrl}/courses/${courseId}/lessons`, body, { headers });
  }

  public getLessons(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}/lessons`, { headers });
  }
  public deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/courses/${courseId}/lessons/${lessonId}`, { headers });
  }
  public updateLesson(courseId: number, lessonId: number, title: string, content: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { title, content, courseId };
    return this.http.put<any>(`${this.apiUrl}/courses/${courseId}/lessons/${lessonId}`, body, { headers });
  }
}
