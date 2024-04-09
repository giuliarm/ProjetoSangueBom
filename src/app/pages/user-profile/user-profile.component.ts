import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/utils/models/userModel';
import { DataService } from 'src/app/services/dataService';
import { differenceInYears } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonationFormModalComponent } from 'src/app/components/modal/donation-form-modal.component';
import { GeneroEnum } from 'src/app/utils/enum/generoEnum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  userIdade: number;
  

  constructor(private dataService: DataService, private modalService: NgbModal) { }

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
  }

  updateUserInfo(){
    //incluir validação dos dados antes da atualização
  }
  

  openDonationFormModal(){
    if(this.user.idade && this.user.idade < 16){
      alert('Você ainda não pode fazer uma doação, obrigada pelo interesse. Retorne assim que tiver os requisitos!')
    }else{
      this.modalService.open(DonationFormModalComponent, {size: 'md'})
    }
  }
}

