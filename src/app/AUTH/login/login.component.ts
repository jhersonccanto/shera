import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import {  Router, RouterLink } from '@angular/router';
import { Message, MessageService } from 'primeng/api';import { NgIf } from '@angular/common';
;

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[  FormsModule,
    InputTextModule,
    CheckboxModule,
    DividerModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ToastModule,
    InputGroupAddonModule,
    InputGroupModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Almacena el token simulado en localStorage
        localStorage.setItem('token', response.token);

        // Redirige a la página de inicio
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }
}

