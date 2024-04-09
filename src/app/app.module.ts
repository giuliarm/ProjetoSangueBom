import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideAuth, Auth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Importe os módulos do AngularFire necessários
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importe o módulo Firestore

// Importe os componentes e serviços necessários
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
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    NgbModule,
    NgbCarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com a configuração do ambiente
    AngularFireAuthModule, // Importe o módulo de autenticação AngularFireAuthModule
    AngularFirestoreModule // Importe o módulo Firestore AngularFirestoreModule
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
