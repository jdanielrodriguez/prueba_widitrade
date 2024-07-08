import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';
import { ComponentesModule } from '../components/componentes.module';

import { LoginFormComponent } from './login/login.component';
import { Modal } from './modal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { SlidersFormComponent } from './sliders-form/sliders-form.component';
const modules = [
  LoginFormComponent,
  Modal,
  RegisterComponent,
  RecoveryComponent,
  PerfilComponent,
  SlidersFormComponent,
]
@NgModule({
  declarations: modules,
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    ComponentesModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: modules
})
export class FormModule { }
