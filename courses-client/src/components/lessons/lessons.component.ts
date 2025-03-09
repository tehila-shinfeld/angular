import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lessons',
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  errorMessage: string = "error";
  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute) { }

  lessons: any[] = [];
  courseId: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      console.log("Course ID:", this.courseId);
      this.loadLessons();
    });
  }

  loadLessons(): void {
    this.coursesService.getLessons(this.courseId).subscribe(
      (lessons: any) => {
        this.lessons = lessons;
        console.log("Lessons loaded:", this.lessons);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        console.error('Error loading lessons:', error);
      }
    );
  }
  addLesson(): void {
    this.router.navigate(['/add-lesson', this.courseId]);
  }

  editLesson(lessonId: number): void {
    this.router.navigate(['/edit-lesson', this.courseId, lessonId]);
  }

  deleteLesson(lessonId: number): void {
    this.coursesService.deleteLesson(this.courseId, lessonId).subscribe(
      response => {
        console.log('Lesson deleted successfully:', response);
        this.loadLessons(); // טען מחדש את השיעורים לאחר מחיקת השיעור
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        console.error('Error deleting lesson:', error);
      }
    );
  }

  trackByLessonId(index: number, lesson: any): number {
    return lesson.id;
  }
}
