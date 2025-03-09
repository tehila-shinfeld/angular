import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-lesson',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule,MatCardModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  lessonForm: FormGroup;
  courseId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
  }

  createLesson(): void {

    console.log("createLesson");
    
    if (this.lessonForm.invalid) {
      return;
    }

    const lessonData = {
      ...this.lessonForm.value,
      courseId: this.courseId
    };


    this.coursesService.createLesson(this.courseId, lessonData.title, lessonData.content).subscribe(
      (response: any) => {
        this.snackBar.open('השיעור נוצר בהצלחה!', 'סגור', { duration: 3000 });
        this.router.navigate(['/courses-management']);
      },
      error => {
        this.snackBar.open('שגיאה ביצירת השיעור', 'סגור', { duration: 3000 });
      }
    );
  }
}
