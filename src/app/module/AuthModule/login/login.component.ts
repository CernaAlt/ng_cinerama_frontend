import { Component, inject } from '@angular/core';
import { AuthUserService } from '../data-access/auth-user.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthUserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    if (!email || !password) {
      toast.error('Por favor complete todos los campos correctamente.');
      return;
    }

    try {
      await this.authService.loginUser({ email, password });
      toast.success('Inicio de sesión exitoso');
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Usuario no encontrado. Verifique sus credenciales.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Contraseña incorrecta. Inténtelo de nuevo.');
      } else {
        toast.error('Ocurrió un error inesperado');
      }
      console.error(error);
    }
  }
}
