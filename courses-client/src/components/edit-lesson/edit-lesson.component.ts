import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-lesson',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent implements OnInit {
  lessonForm: FormGroup;
  courseId: number = 0;
  lessonId: number = 0;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId'));
      this.lessonId = Number(params.get('lessonId'));
      console.log("Course ID:", this.courseId);
      console.log("Lesson ID:", this.lessonId);
    });
  }

  updateLesson(): void {

    if (this.lessonForm.invalid) {
      return;
    }

    const lessonData = {
      ...this.lessonForm.value,
      courseId: this.courseId
    };

    this.coursesService.updateLesson(this.courseId, this.lessonId, lessonData.title, lessonData.content).subscribe(
      (response: any) => {
        this.snackBar.open('השיעור עודכן בהצלחה!', 'סגור', { duration: 3000 });
        console.log(response);

        this.router.navigate(['/lessonsOfCourse', this.courseId]);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.snackBar.open('שגיאה בעדכון השיעור', 'סגור', { duration: 3000 });
      }
    );
  }
}
