import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  course: any;
  lessons: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseDetails(courseId);
    this.getCourseLessons(courseId);
  }

  getCourseDetails(courseId: string | null): void {
    if (courseId) {
      this.coursesService.getCourseDetails(courseId).subscribe(
        data => {
          this.course = data;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      );
    }
  }
  getCourseLessons(courseId: string | null): void {
    if (courseId) {
      this.coursesService.getCourseLessons(courseId).subscribe(
        data => {
          this.lessons = data;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      );
    }
  }
}