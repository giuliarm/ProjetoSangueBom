import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { UserData, UserPhoto } from "../utils/models/userModel";

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

  public async SaveDonationPhoto(formData: UserPhoto) {
    try {
      const tempUID = localStorage.getItem("userID");
      if (!tempUID) {
        return;
      }

      // Adiciona o objeto UserPhoto à subcoleção 'donations'
      await this.firestore
        .collection("users")
        .doc(tempUID)
        .collection("donations")
        .add(formData);
    } catch (e) {
      alert("Erro ao salvar a foto da doação.");
    }
  }

  public async GetAllDonationPhotos() {
    try {
      const donationPhotos: any[] = [];

      // Faz uma consulta para obter todas as fotos da subcoleção 'donations' de todos os usuários
      const querySnapshot = await this.firestore
        .collectionGroup("donations")
        .get()
        .toPromise();

      // Itera sobre os documentos retornados
      querySnapshot.forEach((doc) => {
        // Adiciona os dados do documento à lista de fotos de doação
        donationPhotos.push(doc.data());
      });

      return donationPhotos;
    } catch (e) {
      alert("Erro ao buscar as fotos de doação.");
      return [];
    }
  }

  public async GetUserData(uuid: string) {
    try {
      const user = await this.firestore
        .collection("users")
        .doc(uuid)
        .get()
        .toPromise();
      if (!user.exists) {
        return null;
      }
      const userData = user.data() as UserData;
      return userData;
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      return null;
    }
  }
}
