import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  data = { email: '', password: '', name: '' };
  constructor(private auth: AuthService) {}

  onRegister() {
    this.auth.register(this.data).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        // Optionally, redirect to login or another page
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });
  }
}
