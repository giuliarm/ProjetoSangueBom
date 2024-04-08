import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/dataService';
import { UserPhoto } from 'src/app/utils/models/userModel';

@Component({
  selector: 'app-donation-form-modal',
  templateUrl: './donation-form-modal.component.html',
  styleUrls: ['./donation-form-modal.component.scss']
})
export class DonationFormModalComponent implements OnInit {
  donationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.donationForm = this.formBuilder.group({
      centroDoacao: ['', Validators.required],
      dataDoacao: ['', Validators.required],
      foto: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.donationForm.valid) {
      const formData: UserPhoto = {
        centroDoacao: this.donationForm.value.centroDoacao,
        dataDoacao: this.donationForm.value.dataDoacao,
        foto: this.donationForm.value.foto
      };
      this.sendDonationPhoto(formData);

    } else {
      // exibir mensagem de erro 
    }
  }

  async sendDonationPhoto(formData: UserPhoto) {
    await this.dataService.SaveDonationPhoto().then(response => {

    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
  
    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.donationForm.patchValue({
            foto: base64Image
          });
      };
      reader.readAsDataURL(file);

    } else {
      // exibir uma mensagem de erro 
      console.error('Por favor, selecione um arquivo de imagem válido (JPEG ou PNG).');
      event.target.value = null;
    }
  }
}
