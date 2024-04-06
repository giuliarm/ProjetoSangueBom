import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { UserData } from '../components/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

 
  public async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      const user = credential.user;

      localStorage.setItem("userID", user.uid);

      let usuario = await this.firestore.collection('users').doc(user.uid).set({
        nome: user.displayName,
        email: user.email
      });  
      console.log(usuario);
      
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    }
  }

  
  public async loginWithEmail(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = credential.user;

      localStorage.setItem("userID", user.uid);

     

      

    } catch (error) {
      console.error('Erro ao fazer login com email e senha:', error);
    }
  }

  
  public async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('userID')
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }


  public async RegisterEmail(userData: UserData){
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password);
      const user = credential.user;

      let usuario = await this.firestore.collection('users').doc(user.uid).set({
        nome: userData.nome,
        email: userData.email,
        dataNascimento: userData.dataNascimento,
        genero: userData.genero
      }); 
     console.log(usuario);

    } catch (error) {
      console.error('Erro ao fazer login com email e senha:', error);
    } 
  }
}
