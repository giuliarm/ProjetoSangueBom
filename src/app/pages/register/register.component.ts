import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/app.routing';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(user => {
    }).catch(error => {
      console.error('Erro ao fazer login com o Google:', error);
    });
  }

  register(user){
    this.authService.RegisterEmail(user).then(u => {

    })
  }
}
