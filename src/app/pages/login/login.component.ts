import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(user => {
      this.router.navigate(['/home']); 
    }).catch(error => {
      console.error('Erro ao fazer login com o Google:', error);
    });
  }

  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then(user => {
    }).catch(error => {
      console.error('Erro ao fazer login com email e senha:', error);
    });
  }
}
