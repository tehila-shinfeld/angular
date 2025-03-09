import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  userDetails: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserServiceService,private router: Router) {
    this.userDetails = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.userDetails.valid) {
      const userData = this.userDetails.value; // קבלת הנתונים מהטופס
      this.userService.addUser(userData).subscribe(
        response => {
          alert('User added successfully');
          this.router.navigate(['/']);

          // console.log(userData);
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
