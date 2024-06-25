import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        loggedIn => {
          if (loggedIn) {
            this.router.navigate(['/tv-show-list']);
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error => {
          console.error('Login error:', error);
          this.errorMessage = 'Error en el inicio de sesión';
        }
      );
  }
}
