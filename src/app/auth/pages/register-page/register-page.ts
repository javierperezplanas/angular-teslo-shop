// src/app/auth/pages/register-page/register-page.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = '';
  email = '';
  password = '';

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  register() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService
      .register({
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.successMessage.set(
            '✅ Registrado con éxito'
          );
          // opcional: redirigir después de unos segundos
          setTimeout(
            () => this.router.navigate(['/auth/login']),
            2000
          );
        },
        error: (err) => {
          const msg =
            err?.error?.message?.[0] ||
            err?.error?.message ||
            'Error al registrar';
          this.errorMessage.set(msg);
        },
      });
  }
}
