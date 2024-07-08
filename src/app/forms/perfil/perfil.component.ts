import { Component, OnInit, Input, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServices } from "src/app/services/auth.service";
import { NotificationsService } from 'angular2-notifications';
import { ImagenesComponent } from "./../../components/imagenes/imagenes.component";
import { Perfil, Imagen } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
import { Formatos } from 'src/app/common/format';
declare var $: any
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  private _perfil: Perfil = new Perfil()
  sliders: Imagen[] = [
  ]
  private _titulo!: string
  private _muestraTexto!: boolean
  constructor(
    private mySesion: Sesion,
    private _service: NotificationsService,
    private formatear: Formatos,
    private authService: AuthServices,
  ) { }
  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, '300');
    // if (this._perfil.imagenes.length > 0) {
    //   this.sliders = this._perfil.imagenes
    // }
  }
  ngAfterViewInit() {
    this.validarImagenes()
  }
  cargarImagen(resp: Imagen) {
    // if (resp.id > 0) {
    //   resp.usuario = this.perfil.id
    //   this.validarImagenes(resp)
    // }
  }
  validarImagenes(value?: Imagen) {
    if (this.sliders.length > 1) {
      // this.authService.deleteImage(this.sliders[0].id).then((element: Imagen) => {
      //   if (value) {
      //     this._perfil.imagenes = [value]
      //     this.sliders = this._perfil.imagenes
      //   }
      //   this.mySesion.actualizaPerfil(this._perfil);
      // }).catch(error => {
      //   console.log(error);
      // })
    } else {
      if (value) {
        if (this.sliders.length > 0) {
          // this.authService.deleteImage(this.sliders[0].id).then((element: Imagen) => {
          //   // console.log(element);
          //   this.createWarning("Se cargo su nueva imagen de perfil, guarde sus cambios.")
          // }).catch(error => {
          //   console.log(error);
          // })
        }
        this.mySesion.actualizaPerfil(this._perfil);
      }
    }
  }
  async guardar() {
    this.blockUI.start();
    // if (this._proveedor) {
    //   this._proveedor.nombre = this._proveedor.nombre ? this.formatear.getCleanedString(this._proveedor.nombre) : this._proveedor.nombre
    //   this._proveedor.apellido = this._proveedor.apellido ? this.formatear.getCleanedString(this._proveedor.apellido) : this._proveedor.apellido
    //   this._proveedor.nacimiento = this._proveedor.nacimiento ? btoa(this._proveedor.nacimiento) : this._proveedor.nacimiento
    //   this._proveedor.estado = this._proveedor.estado ? this._proveedor.estado : 2
    // }
    // if (this._cliente) {
    //   this._cliente.nombre = this._cliente.nombre ? this.formatear.getCleanedString(this._cliente.nombre) : this._cliente.nombre
    //   this._cliente.apellido = this._cliente.apellido ? this.formatear.getCleanedString(this._cliente.apellido) : this._cliente.apellido
    //   this._cliente.nombre_a_facturar = this._cliente.nombre_a_facturar ? this.formatear.getCleanedString(this._cliente.nombre_a_facturar) : this._cliente.nombre_a_facturar
    // }
    // let data = {
    //   id: this._proveedor.id,
    //   proveedor: this.mySesion.encriptar(JSON.stringify(this._proveedor)),
    //   cliente: this.mySesion.encriptar(JSON.stringify(this._cliente)),
    //   usuario: this.mySesion.encriptar(JSON.stringify(this._perfil))
    // }
    // if (this._proveedor.id) {
    //   await this.provsService.update(data).then((element: Proveedor) => {
    //     this.createSuccess("Se actualizo la informacion del proveedor")
    //   }).catch(error => {
    //     this.createError("Error actualizando proveedor")
    //     if(error.indexOf('401')>=0){
    //       this.mySesion.navegar({url:'./logout'})
    //     }
    //   })
    // }
    // if (this._cliente.id) {
    //   data.id = this._cliente.id
    //   await this.clienteService.update(data).then((element: Cliente) => {
    //     this.createSuccess("Se actualizo la informacion del cliente")
    //   }).catch(error => {
    //     this.createError("Error actualizando cliente")
    //   })
    // }

    if (this.sliders.length > 0) {
      const authServ = this.authService
        .updateImage(this.sliders[0])
        .subscribe({
          next: (element: Imagen) => {
            this.sliders = [element]
            this.mySesion.actualizaPerfil(this._perfil)
            this.createSuccess("Se actualizo la imagen de perfil")
          }, error: error => {
            this.createError("Error actualizando Imagen")
          },
          complete: () => { authServ.unsubscribe(); }
        });
    }
    this.mySesion.actualizaPerfil(this._perfil);
    this.mySesion.actualizaPerfil()
    this.blockUI.stop();
  }

  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success)
  }
  createError(error: string) {
    this._service.error('¡Error!', error)
  }
  createWarning(error: string) {
    this._service.warn('¡Cuidado!', error)
  }
  @Input()
  set perfil(value: Perfil) {
    // if (this._perfil.imagenes.length > 0) {
    //   this.sliders = this._perfil.imagenes
    // }
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
}
