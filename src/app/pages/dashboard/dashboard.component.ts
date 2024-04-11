import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DonationFormModalComponent } from "src/app/components/modal/donation-form/donation-form-modal.component";
import { WaitDonationFormModalComponent } from "src/app/components/modal/wait-donation-form/wait-donation-form-modal.component";
import { AuthService } from "src/app/services/authService";
import { DataService } from "src/app/services/dataService";

declare var $: any; 

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  @ViewChild('carousel', { static: false }) carousel: any;

  public isLogged: boolean = false;
  images: any[] = [];
  userAge: any;


  constructor(private authService: AuthService,  private modalService: NgbModal, private elementRef: ElementRef, private dataService: DataService) {}

  ngOnInit() {
    this.checkIsLogged();
    this.loadDefaultImages();
    this.userAge = localStorage.getItem('userAge');
  }

  ngAfterViewInit(): void {
    $(document).ready(() => {
      $('.carousel').carousel(); 
    });}
  

  checkIsLogged(): void {
    this.isLogged = this.authService.getIsLogged();
  }

  openDonationFormModal(){
    if(this.userAge && this.userAge < 16){
      alert('Você ainda não pode fazer uma doação, obrigada pelo interesse. Retorne assim que tiver os requisitos!')
    }else{
      this.modalService.open(WaitDonationFormModalComponent, {size: 'md'})
    }  }

  loadDefaultImages(): void {
    for (let i = 1; i <= 3; i++) { 
      this.images.push({
        src: `assets/carousel-images/image${i}.jpg`, 
        legenda: '', 
      });
    }
    //this.loadImages();
  }
  loadImages(): void {
    this.dataService.GetAllDonationPhotos().then(
      (resposta) => {
        if (resposta && resposta.length > 0) {
          resposta.forEach((foto) => {
            const existe = this.images.some(img => img.src === `data:image/jpeg;base64,${foto.foto}`);
            if (!existe) {
              this.images.push({
                src: `data:image/jpeg;base64,${foto.foto}`,
                legenda: foto.centroDoacao,
                degradê: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
              });
            }
          });
        }
      },
      (error) => {
        console.error('Erro ao buscar fotos:', error);
      }
    );
  }

}
