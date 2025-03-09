import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-courses',
  imports: [MatCardModule, MatButtonModule, MatIconModule,RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {
  courses: any[] = [];
  errorMessage: string="error";
  constructor(private coursesService: CoursesService, private router: Router,private auth: AuthService) { }

  ngOnInit(): void {
    this.coursesService.gxetAllCourses().subscribe(data => {
      this.courses = data;
      console.log(this.courses);
    });
  }

  enroll(courseId: number): void {
    console.log(this.auth.getUserId());
    
    const userId = Number(this.auth.getUserId());
    if (userId) {
      this.coursesService.enrollInCourse(courseId, userId).subscribe(
        response => {
          alert('Enrolled successfully 👏');
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          console.error('Enrollment error:', error);
        }
      );
    }
    else {
      alert('You must be logged in to enroll in a course');
    }
  }

  unenroll(courseId: number): void {
    const userId = Number(this.auth.getUserId());
    if (userId) {
      this.coursesService.unenrollFromCourse(courseId, userId).subscribe(
        response => {
          alert('Unenrolled successfully 👏');
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          console.error('Unenrollment error:', error);
        }
      );
    } else {
      alert('You must be logged in to unenroll from a course');
    }
  }
}