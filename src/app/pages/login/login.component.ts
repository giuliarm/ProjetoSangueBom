import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(user => {
   
    }).catch(error => {
      console.error('Erro ao fazer login com o Google:', error);
    });
  }

  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then(user => {
      // Aqui você pode redirecionar o usuário para a próxima página ou realizar outras operações necessárias
    }).catch(error => {
      console.error('Erro ao fazer login com email e senha:', error);
    });
  }
}
