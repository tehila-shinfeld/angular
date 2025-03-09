import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-course',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})

export class EditCourseComponent {

  courseForm: FormGroup;
  courseId: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      console.log("Course ID:", this.courseId);
    });
  }
  
  updateCourse(): void {

    if (this.courseForm.invalid) {
      return;
    }

    const courseData = {
      ...this.courseForm.value,
      teacherId: Number(this.auth.getUserId())
    };

    this.coursesService.updateCourse(this.courseId, courseData.title, courseData.description, courseData.teacherId).subscribe(
      (response: any) => {
        this.snackBar.open('הקורס עודכן בהצלחה!', 'סגור', { duration: 3000 });
        this.router.navigate(['/courses-management']);
      },
      error => {
        this.snackBar.open('שגיאה בעדכון הקורס', 'סגור', { duration: 3000 });
      }
    );
  }
}
