import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/utils/models/userModel';
import { DataService } from 'src/app/services/dataService';
import { differenceInYears } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonationFormModalComponent } from 'src/app/components/modal/donation-form/donation-form-modal.component';
import { GeneroEnum } from 'src/app/utils/enum/generoEnum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaitDonationFormModalComponent } from 'src/app/components/modal/wait-donation-form/wait-donation-form-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  userIdade: number;
  profileForm: FormGroup;


  constructor(private dataService: DataService, private modalService: NgbModal, private formBuilder: FormBuilder ) { }

   ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    let userId = localStorage.getItem("userID");
    this.user = await this.dataService.GetUserData(userId);

    this.user.jaDoador = true;

    let date = new Date(this.user.dataNascimento).toLocaleDateString();
    this.user.idade = differenceInYears(new Date(), date);

    localStorage.setItem("userAge", this.user.idade);

    console.log(this.user);

    this.initForm();
  }

  initForm(){
    this.profileForm = this.formBuilder.group({
      nome: [this.user.nome, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      dataNascimento: [this.user.dataNascimento, Validators.required],
      genero: [this.user.genero, Validators.required],
      jaDoador: [this.user.jaDoador],
      idade: [this.user.idade]
    });
  }

  updateUserInfo(){
    //incluir validação dos dados antes da atualização, não será utilizado de inicio
  }
  

  openDonationFormModal(){
    if(this.user.idade && this.user.idade < 16){
      alert('Você ainda não pode fazer uma doação, obrigada pelo interesse. Retorne assim que tiver os requisitos!')
    }else{
      this.modalService.open(WaitDonationFormModalComponent, {size: 'md'})
    }
  }
}

