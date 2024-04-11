import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideAuth, Auth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ComponentsModule } from './components/components.module';
import { GeocodeService } from './services/geocodeService';
import { AuthService } from './services/authService';
import { AppRoutingModule } from './app.routing';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    NgbModule,
    NgbCarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule 
  ],
  providers: [
    GeocodeService,
    AuthService,
    {
      provide: FirebaseApp,
      useFactory: () => initializeApp(environment.firebaseConfig)
    },
    {
      provide: Auth,
      useFactory: () => getAuth()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
