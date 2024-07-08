import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './components/componentes.module';
import { FormModule } from './forms/forms.module';
import { LoginComponent } from './login/login.component';
import { Encript } from "./common/encript";
import { Sesion } from "./common/sesion";
import { Formatos } from "./common/format";
import { Constantes } from "./common/constant";
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';

import { AuthServices } from './services/auth.service';
import { ContentService } from './services/content.service';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInformationComponent } from './dashboard/my-information/my-information.component';
import { ContenidoComponent } from './pages/contenido/contenido.component';
import { MyContentComponent } from './dashboard/my-content/my-content.component';
import { MyFavoritesComponent } from './dashboard/my-favorites/my-favorites.component';
import { LandingComponent } from './dashboard/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    AuthComponent,
    MyInformationComponent,
    ContenidoComponent,
    MyContentComponent,
    MyFavoritesComponent,
    LandingComponent,
  ],
  imports: [
    AppRoutingModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    ComponentesModule,
    FormsModule,
    FormModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    RecaptchaV3Module,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthServices,
    Constantes,
    Encript,
    Formatos,
    ContentService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfW5vgUAAAAAFMhgbCPIkZHjH9tq95IYX4aIZSn'
    },
    Sesion,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
