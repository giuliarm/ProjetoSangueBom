import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from 'src/app/app.routing';
import { GeneroEnum } from 'src/app/components/enum/generoEnum';
import { UserData } from 'src/app/components/models/userModel';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserData = { nome: '', email: '', password: '', dataNascimento: null, genero: null };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(user => {
    }).catch(error => {
      console.error('Erro ao fazer login com o Google:', error);
    });
  }

  register(user: UserData){
    console.log(user)
    this.authService.RegisterEmail(user).then(u => {

    })
  }
}
