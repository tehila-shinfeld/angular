import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Router, RouterLink } from '@angular/router';
import { AddLessonComponent } from "../add-lesson/add-lesson.component";

@Component({
  selector: 'app-course-management',
  imports: [RouterLink, AddLessonComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = [];
  errorMessage: string = '';

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.gxetAllCourses().subscribe(
      (data: any) => {
        this.courses = data;
        console.log("response", this.courses)
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    );
    console.log(this.courses)
  }

  addCourse(title: string, description: string, teacherId: number): void {
    this.coursesService.createCourse(title, description, teacherId).subscribe(
      response => {
        console.log('Course created successfully:', response);
        this.loadCourses(); // טען מחדש את הקורסים לאחר יצירת הקורס
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        console.error('Error creating course:', error);
      }
    );
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/edit-course', courseId]);
  }

  deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId).subscribe(
      response => {
        console.log('Course deleted successfully:', response);
        this.loadCourses();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        console.error('Error deleting course:', error);
      }
    );
  }
  // ================================================
  lessonsManage(courseId: number) 
  {
    this.router.navigate(['/lessonsOfCourse', courseId]);
  } 
}
