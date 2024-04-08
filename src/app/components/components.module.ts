import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DonationFormModalComponent } from './modal/donation-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    DonationFormModalComponent 
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DonationFormModalComponent
  ]
})
export class ComponentsModule { }
