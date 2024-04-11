import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DonationFormModalComponent } from './modal/donation-form/donation-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WaitDonationFormModalComponent } from './modal/wait-donation-form/wait-donation-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule 
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DonationFormModalComponent,
    WaitDonationFormModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DonationFormModalComponent,
    WaitDonationFormModalComponent
  ]
})
export class ComponentsModule { }
