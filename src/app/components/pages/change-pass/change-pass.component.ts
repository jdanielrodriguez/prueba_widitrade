import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordForm, Response, ResponseCAPTCHA } from '../../../interfaces';
import { Sesion } from '../../../common/sesion';
import { AuthServices } from '../../../services/auth.service';
import { ChangePassFormulario } from './change-pass-form.component';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: [],
})
export class ChangePassComponent implements OnInit {
  constructor(
    private AuthService: AuthServices,
    private config: NgbModalConfig,
    private mySesion: Sesion,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }
  @ViewChild(ChangePassFormulario) changePassForm!: ChangePassFormulario;
  @Input() esModal = false;
  @Input() muestraTexto = false;
  @Input() titulo = '';
  @Input() oldRequired = true;
  @Input() authProfile: string = '';
  ngOnInit(): void {
    if (this.esModal) {
      const temp = ChangePassFormulario;
      if (this.titulo) {
        if (this.changePassForm) {
          this.changePassForm.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo;
      this.modalService.open(temp);
    }
    this.mySesion.scrollTop();
    this.mySesion.showCaptcha();
  }
  async simpleRestore(form: NgForm) {
    let validateCaptcha = await this.mySesion.validateCaptcha('passwordRestore');
    if (!validateCaptcha) {
      this.mySesion.createError("Error validando Captcha.");
      this.mySesion.loadingStop();
      validateCaptcha = await this.mySesion.validateCaptcha('passwordRestore');
      this.simpleRestore(form);
      return;
    }
    const captchaData = {
      token: btoa(validateCaptcha)
    };
    const authServ = this.AuthService.validarCaptcha(captchaData)
      .subscribe({
        next: (response: ResponseCAPTCHA) => {
          if (response.objeto.success) {
            this.mySesion.loadingStop();
            this.changePass(form);
          }
        },
        error: async error => {
          this.mySesion.createError('Error iniciando sesion');
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  changePass(form: NgForm) {
    this.mySesion.validarSesion();
    let formValue: ChangePasswordForm = new ChangePasswordForm(form.value);
    if (this.oldRequired) {
      formValue.id = this.mySesion.perfil.id;
      formValue.perfil = this.mySesion.perfil;
    } else {
      const perfil = this.authProfile ? JSON.parse(this.mySesion.desencriptar(this.authProfile)) : null;
      formValue.id = perfil ? btoa(perfil.id) : null;
      formValue.perfil = perfil;
      formValue.old_pass = null;
      formValue.token = perfil.token;
    }
    this.mySesion.loadingStart();
    const authServ = this.AuthService.updatePass(formValue)
      .subscribe({
        next: (response: Response) => {
          if (response.status === 200) {
            const mySesionPerfil = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
            this.mySesion.actualizaPerfil(mySesionPerfil);
            this.mySesion.createSuccess('Su Clave fue Cambiada');
            this.mySesion.loadingStop();
            this.closeModal();
            form.value.new_pass = '';
            form.value.new_pass_rep = '';
            form.value.old_pass = '';
            this.mySesion.navegar({ url: `./` });
          }
        },
        error: error => {
          this.mySesion.createError(error);
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  open(content: any) {
    this.modalService.open(content);
  }

}
