import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.username, this.password)
      .subscribe(
        registered => {
          if (registered) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Error en el registro';
          }
        },
        error => {
          console.error('Registro error:', error);
          this.errorMessage = 'Error en el registro';
        }
      );
  }
}
