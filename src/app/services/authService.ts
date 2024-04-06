import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

 
  public async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;
      console.log('UID do usuário:', user.uid);
      console.log('Email do usuário:', user.email);
      console.log('Nome de exibição do usuário:', user.displayName);
      console.log('URL da foto do usuário:', user.photoURL);
      console.log('Número de telefone do usuário:', user.phoneNumber);
      console.log('Identificador do provedor de autenticação:', user.providerId);
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    }
  }

  
  public async loginWithEmail(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = credential.user;
      console.log('UID do usuário:', user.uid);
      console.log('Email do usuário:', user.email);
      console.log('Nome de exibição do usuário:', user.displayName);
      console.log('URL da foto do usuário:', user.photoURL);
      console.log('Número de telefone do usuário:', user.phoneNumber);
      console.log('Identificador do provedor de autenticação:', user.providerId);
    } catch (error) {
      console.error('Erro ao fazer login com email e senha:', error);
    }
  }

  
  public async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Usuário desconectado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
