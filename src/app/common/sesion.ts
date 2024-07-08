import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { Encript } from "./encript";
import { Menus, Perfil } from './../interfaces';
declare var $: any

@Injectable()
export class Sesion {
  constructor(
    private localSt: LocalStorageService,
    private cripto: Encript,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _service: NotificationsService,
    private router: Router
  ) {
    this.actualizaPerfil();
  }
  @LocalStorage('lastLink') lastLinkStore!: string | null;
  @LocalStorage('currentPerfil') currentPerfil!: string;
  @BlockUI() blockUI!: NgBlockUI;

  perfil: Perfil = new Perfil();
  token = '';
  captchaSubscription!: Subscription;
  lastLink: string | null = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });
  encriptar(value: string | null | undefined): string {
    let newLetter: string = '';
    if (value) {
      value = this.cripto.encriptar(value);
      newLetter = value ? value : '';
    }
    return newLetter;
  }
  desencriptar(value: string): string {
    let newLetter: string | null = '';
    const decript = this.cripto.desencriptar(value);
    value = decript ? decript : '';
    newLetter = value;
    return newLetter;
  }
  validarSesion(): boolean {
    let response = false;
    const tempData = this.currentPerfil;
    let perfil: Perfil;
    if (tempData && !this.perfil) {
      const decript = this.desencriptar(tempData);
      perfil = tempData ? decript ? JSON.parse(decript) : null : null;
      if (parseInt(perfil.id + '', 10) > 0) {
        this.perfil = perfil;
      }
      response = parseInt(perfil.id + '', 10) > 0;
    } else if (this.perfil) {
      response = parseInt(this.perfil.id + '', 10) > 0;
    }
    return response;
  }
  async validateCaptcha(action: string): Promise<string> {
    if (this.captchaSubscription) {
      this.captchaSubscription.unsubscribe();
    }
    const prom: string = await new Promise((resolve, reject) => {
      this.captchaSubscription = this.recaptchaV3Service.execute(action)
        .subscribe({
          next: (captchaToken) => {
            resolve(captchaToken);
          },
          error: (error) => {
            if (error.msg) {
              reject(error.msg)
              this.createError(error.msg)
            } else {
              reject("Error desconocido, por favor trate otra vez")
              this.createError("Error desconocido, por favor trate otra vez")
            }
          },
          complete: () => { this.captchaSubscription.unsubscribe(); }
        });
    });
    return prom;
  }
  actualizaPerfil(perf?: Perfil): void {
    if (perf) {
      const tempData = this.currentPerfil;
      let perfil: Perfil;
      if (tempData) {
        const decript = this.desencriptar(tempData);
        perfil = this.perfil ? this.perfil : decript ? JSON.parse(decript) : null;
        if (perfil) {
          const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
          if (per) {
            this.localSt.store('currentPerfil', per);
          } else {
            this.localSt.clear('currentPerfil');
          }
          this.perfil = perfil;
        } else {
          this.perfil = new Perfil();
        }

      } else {
        const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
        this.localSt.store('currentPerfil', per);
      }
      this.perfil = perf;
    } else {
      let perfil: Perfil = new Perfil();
      if (this.currentPerfil && this.currentPerfil !== 'dW5kZWZpbmVk') {
        const decript = this.desencriptar(this.currentPerfil);
        const per = decript ? JSON.parse(decript) : null;
        if (per) {
          perfil = per;
        }
      }
      this.perfil = perfil;
    }
  }
  reloadToken(strToken?: string): void {
    const token = strToken ? strToken : this.perfil.token ? this.perfil.token : '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token ? 'Bearer ' + token : ''
    });
    this.headers = headers;
    this.token = token;
  }
  navegar(data: Menus, id?: number) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    this.router.navigate([data.url]);
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', this.encriptar(id + ''));
    }
  }
  scrollTop() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  validarEmail(valor?: string): boolean {
    if (valor) {
      return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor))
    }
    return false;
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success)
  }
  createError(error: string) {
    this._service.error('¡Error!', error)
  }
  loadingStart() {
    this.blockUI.start();
  }
  loadingStop() {
    this.blockUI.stop();
  }
  showCaptcha() {
    setTimeout(() => {
      $(".grecaptcha-badge").removeClass("visible");
      $(".grecaptcha-badge").addClass("visible");
    }, 1000);
  }
  hideCaptcha() {
    $(".grecaptcha-badge").removeClass("visible");
    setTimeout(() => {
      $(".grecaptcha-badge").removeClass("visible");
    }, 1000);
  }
}
