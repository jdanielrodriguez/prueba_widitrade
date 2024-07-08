import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NavComponent } from './nav/nav.component';

import { NgbAccordionModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';

import { CalendarComponent } from './calendar/calendar.component';
import { ChangePassFormulario } from './pages/change-pass/change-pass-form.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { FooterComponent } from './footer/footer.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LogoutComponent } from './logout/logout.component';
import { PerfilViewComponent } from './pages/perfil-view/perfil-view.component';
import { ContentComponent } from './pages/content/content.component';
import { SlidersComponent } from './sliders/sliders.component';

import { JustTextPipe } from '../pipes/just-text.pipe';

import { AccordeonComponent } from './accordeon/accordeon.component';
import { CardsComponent } from './cards/cards.component';
import { BusquedaComponent } from './search/busqueda.component';

const modules = [
  BusquedaComponent,
  NavComponent,
  GaleriaComponent,
  SlidersComponent,
  FooterComponent,
  LogoutComponent,
  ImagenesComponent,
  JustTextPipe,
  ChangePassComponent,
  ChangePassFormulario,
  PerfilViewComponent,
  ContentComponent,
  CardsComponent,
  AccordeonComponent,
  CalendarComponent,
]
@NgModule({
  declarations: modules,
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    NgbAccordionModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: modules
})
export class ComponentesModule { }
