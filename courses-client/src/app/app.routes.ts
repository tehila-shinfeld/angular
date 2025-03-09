import { HomeComponent } from '../components/home/home.component';
import { Routes } from '@angular/router'; // וודא שזה מיובא
import { LogInComponent } from '../components/log-in/log-in.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { tokenGuard } from '../guards/token.guard';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { EditLessonComponent } from '../components/edit-lesson/edit-lesson.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'course/:id', component: CourseDetailsComponent, canActivate: [tokenGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: 'logIn', component: LogInComponent },
    { path: 'signUp', component: SignInComponent },
    { path: 'courses', component: CoursesComponent, canActivate: [tokenGuard] },
    { path: 'courses-management', component: CourseManagementComponent, canActivate: [tokenGuard] },
    { path: 'add-course', component: AddCourseComponent, canActivate: [tokenGuard] },
    { path: 'edit-course/:id', component: EditCourseComponent, canActivate: [tokenGuard] },
    { path: 'add-lesson/:id', component: AddLessonComponent, canActivate: [tokenGuard] },
    { path: 'lessonsOfCourse/:id', component: LessonsComponent, canActivate: [tokenGuard] },
    { path: 'edit-lesson/:courseId/:lessonId', component: EditLessonComponent, canActivate: [tokenGuard] },
];  
