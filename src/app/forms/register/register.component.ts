import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Menus, Perfil, Response, ResponseCAPTCHA } from "./../../interfaces";
import { Sesion } from './../../common/sesion';
import { AuthServices } from "./../../services/auth.service";
import { UsuariosService } from "./../../services/usuarios.service";
import { Modal } from "./../modal.component";
declare var $: any
@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  today: any
  nacimientoToday: any
  @ViewChild(Modal) registerModal!: Modal
  component: EventEmitter<string> = new EventEmitter<string>();
  componentStr!: string
  @Input() esModal!: boolean;
  @Input() titulo: string = "";
  @Input() dinamicLink: string = "";
  constructor(
    public userServices: UsuariosService,
    private modalService: NgbModal,
    private authServices: AuthServices,
    private config: NgbModalConfig,
    private mySesion: Sesion,
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
        if (this.registerModal) {
          this.registerModal.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo
      this.modalService.open(temp);
    }
    this.mySesion.showCaptcha();
  }
  socialSignIn(socialProvider: string) {
    // this.mySesion.loadingStart();
    // let socialPlatformProvider;
    // if (socialProvider === 'facebook') {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialProvider === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }
    // this.OAuth.signIn(socialPlatformProvider).then((socialusers: Socialusers) => {
    //   let perfil = new Perfil();
    //   let cliente = new Cliente();
    //   perfil.codigo = socialusers.id
    //   perfil.password = btoa(socialusers.id)
    //   perfil.google = socialProvider
    //   perfil.idToken = socialusers.idToken ? socialusers.idToken : ''
    //   perfil.nombre = socialusers.name
    //   cliente.nombre = socialusers.firstName
    //   cliente.apellido = socialusers.lastName
    //   if (socialProvider === 'facebook') {
    //     perfil.google_id = socialusers.id
    //     perfil.facebook_id = socialusers.id
    //     perfil.google_token = socialusers.authToken
    //   } else if (socialProvider === 'google') {
    //     perfil.google_id = socialusers.id
    //     perfil.google_token = socialusers.authToken
    //     perfil.idToken = socialusers.authToken
    //   }
    //   perfil.google_idToken = socialusers.idToken ? socialusers.idToken : ''
    //   perfil.email = socialusers.email
    //   perfil.username = socialusers.email.split('@')[0]
    //   perfil.picture = socialusers.photoUrl
    //   cliente.estado = 1
    //   perfil.estado = 1
    //   cliente.nombre_a_facturar = socialusers.name
    //   let img = new Imagen()
    //   img.url = socialusers.photoUrl
    //   perfil.imagenes = [img]
    //   this.perfil = perfil
    //   this.obtenerCliente(cliente)
    //   this.registrar(true)
    // }).catch(error => {
    //   this.mySesion.loadingStop();
    //   console.log(error);
    // });
  }
  async simpleSignUp(form: NgForm) {
    let perfil: Perfil = new Perfil(form.value);
    let validateCaptcha = await this.mySesion.validateCaptcha('signup');
    if (!validateCaptcha) {
      this.mySesion.createError("Error validando Captcha.");
      this.mySesion.loadingStop();
      validateCaptcha = await this.mySesion.validateCaptcha('signup');
      this.simpleSignUp(form);
      return;
    }
    const captchaData = {
      token: btoa(validateCaptcha)
    };
    if (!this.mySesion.validarEmail(perfil.email)) {
      this.mySesion.createError("Su correo es incorrecto.");
      this.mySesion.loadingStop();
    }
    const authServ = this.authServices.validarCaptcha(captchaData)
      .subscribe({
        next: (response: ResponseCAPTCHA) => {
          if (response.objeto.success) {
            this.registrar(perfil, false);
          }
        },
        error: async error => {
          this.mySesion.createError('Error iniciando sesion');
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  registrar(perfil: Perfil, social: boolean = false) {
    if (!social) {
      this.mySesion.loadingStart();
    }
    const data = {
      user: this.mySesion.encriptar(JSON.stringify(perfil))
    }
    const request = this.userServices.create(data)
      .subscribe({
        next: (response: Response) => {
          this.mySesion.loadingStop();
          if (response.status >= 400) {
            this.mySesion.createError(response.msg ? response.msg : '')
          }
          const perfil = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
          this.mySesion.actualizaPerfil(perfil);
          if (!this.mySesion.validarSesion()) {
            this.mySesion.createError("Error iniciando sesion");
            return;
          }
          this.mySesion.hideCaptcha();
          if (this.modalService.hasOpenModals()) {
            this.closeModal()
          }
          if (!this.mySesion.lastLink) {
            this.mySesion.navegar({ url: `./` });
            return;
          }
          let linkURL = "./";
          if (this.mySesion.lastLink.length > 3) {
            let urls = this.mySesion.lastLink
            linkURL = urls
          }
          if (!linkURL) {
            this.mySesion.navegar({ url: `./` })
          }
          this.mySesion.lastLink = null
          this.mySesion.navegar({ url: `${linkURL}` })
        },
        error: (error) => {
          this.mySesion.loadingStop();
          if (error.msg) {
            this.mySesion.createError(error.msg)
          } else {
            this.mySesion.createError("Error desconocido, por favor trate otra vez")
          }
        },
        complete: () => { request.unsubscribe(); }
      });
  }
  closeModal() {
    this.modalService.dismissAll();
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
  public ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }
}
