import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { UserData } from "../components/models/userModel";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  public async UpdateRegister(userData: UserData) {
    try {
      const tempUID = localStorage.getItem("userID");
      if (!tempUID) {
        return;
      }
      await this.firestore.collection("users").doc(tempUID).update(userData);
    } catch (e) {
      alert("Erro ao salvar informações.");
    }
  }

  public async SaveDonationPhoto() {}

  public async GetUserData(uuid: string) {
    try {
      const user = await this.firestore.collection("users").doc(uuid).get().toPromise();
      if (!user.exists) {
        return null;
      }
      const userData = user.data() as UserData;
      return userData;
      } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }
}
