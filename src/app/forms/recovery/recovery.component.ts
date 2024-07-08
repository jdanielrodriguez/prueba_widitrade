import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Menus, Perfil, Response, ResponseCAPTCHA } from "./../../interfaces";
import { Sesion } from './../../common/sesion';
import { AuthServices } from "./../../services/auth.service";
import { Modal } from "./../modal.component";
declare var $: any
@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit, OnDestroy {
  @ViewChild(Modal) recoveryModal!: Modal
  @Output() component: EventEmitter<string> = new EventEmitter<string>();
  @Input() componentStr: string = '';
  @Input() data: Perfil = new Perfil();
  @Input() esModal: boolean = false;
  @Input() dinamicLink: string = '';
  @Input() titulo: string = '';

  constructor(
    private authServices: AuthServices,
    private modalService: NgbModal,
    private mySesion: Sesion,
    private config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
    config.size = 'lg'
  }
  ngOnInit() {
    this.mySesion.scrollTop();
    if (this.esModal) {
      let temp = Modal
      if (this.titulo) {
        if (this.recoveryModal) {
          this.recoveryModal.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo
      this.modalService.open(temp);
    }
    this.mySesion.showCaptcha();
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    if (this.modalService.hasOpenModals()) {
      this.componentStr = data.url
      this.component.emit(this.componentStr);
    } else {
      this.mySesion.navegar({ url: `${data.url}` })
    }
  }
  async recovery(form: NgForm) {
    let perfil: Perfil = new Perfil(form.value);
    let validateCaptcha = await this.mySesion.validateCaptcha('recovery');
    this.mySesion.loadingStart();
    if (!validateCaptcha) {
      this.mySesion.createError("Error validando Captcha.");
      this.mySesion.loadingStop();
      validateCaptcha = await this.mySesion.validateCaptcha('recovery');
      this.recovery(form);
      return;
    }
    const captchaData = {
      token: btoa(validateCaptcha)
    };
    const authServ = this.authServices.validarCaptcha(captchaData)
      .subscribe({
        next: (response: ResponseCAPTCHA) => {
          if (response.objeto.success) {
            if (perfil.email) {
              this.restore(perfil.email);
            }
          }
        },
        error: (error: any) => {
          this.mySesion.createError('Error iniciando sesion');
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });

  }
  restore(email: string) {
    let dat: any = {
      email: btoa(email)
    }
    const authServ = this.authServices.restore(dat)
      .subscribe({
        next: (response: Response) => {
          if (response.status != 200) {
            this.mySesion.createError('No se encuentra el usuario ingresado');
            this.mySesion.loadingStop();
            return;
          }
          this.mySesion.hideCaptcha();
          let url = "../";
          if (this.mySesion.lastLink) {
            url = this.mySesion.lastLink
          }
          this.mySesion.navegar({ url });
          this.mySesion.loadingStop();
        },
        error: async (error: any) => {
          this.mySesion.createError('No se encuentra el usuario ingresado');
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }

}
