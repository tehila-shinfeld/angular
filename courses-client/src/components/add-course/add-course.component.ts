import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private courseService: CoursesService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createCourse() {
    if (this.courseForm.invalid) {
      alert('אנא מלא את כל השדות');
      return;
    }

    const courseData = {
      ...this.courseForm.value,
      teacherId: Number(this.auth.getUserId())
    };

    this.courseService.createCourse(courseData.title, courseData.description, courseData.teacherId).subscribe(
      (response: any) => {
        this.snackBar.open('הקורס נוצר בהצלחה!', 'סגור', { duration: 3000 });
        this.courseForm.reset();
        this.router.navigate(['/courses-management']);
        
      },
      error => {
        this.snackBar.open('שגיאה ביצירת הקורס', 'סגור', { duration: 3000 });
      }
    );
  }
}
