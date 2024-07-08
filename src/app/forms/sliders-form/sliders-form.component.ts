import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { AuthServices } from "src/app/services/auth.service";
import { NotificationsService } from "angular2-notifications";
import { ImagenesComponent } from "./../../components/imagenes/imagenes.component";
import {
  Perfil,
  Imagen,
  FilterGET,
} from "src/app/interfaces";
import { Sesion } from 'src/app/common/sesion';
import { Formatos } from 'src/app/common/format';
declare var $: any;
@Component({
  selector: "app-sliders-form",
  templateUrl: "./sliders-form.component.html",
  styleUrls: ["./sliders-form.component.css"],
})
export class SlidersFormComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  sliders: Imagen[] = [];
  private _titulo!: string;
  private _muestraTexto!: boolean;
  constructor(
    private mySesion: Sesion,
    private _service: NotificationsService,
    private formatear: Formatos,
    private authService: AuthServices,
  ) { }
  ngOnInit(): void {
    $("html, body").animate({ scrollTop: 0 }, "300");
    this.obtenerSliders();
  }
  cargarImagen(resp: Imagen) {
    // if (resp.id > 0) {
    //   resp.proveedor = this.perfil.id;
    //   if (this.sliders) {
    //     this.sliders.push(resp);
    //   } else {
    //     this.sliders = [resp];
    //   }
    // }
  }
  obtenerSliders() {
    this.blockUI.start();
    let data: FilterGET = {
      id: 0,
      filter: "imagenes",
      estado: "",
    };
    this.sliders = [];
    // this.provsService
    //   .getAllFilter(data)
    //   .then((response: Imagen[]) => {
    //     this.sliders = response;
    //     this.blockUI.stop();
    //   })
    //   .catch((error) => {
    //     this.blockUI.stop();
    //     console.log(error);
    //   });
  }
  guardar() {
    this.blockUI.start();
    if (this.sliders.length > 0) {
      let respuesta: Imagen[] = [];
      this.sliders.forEach(async (element: Imagen) => {
        // element.proveedor = this._perfil.id;
        const authServ = this.authService
          .updateImage(element)
          .subscribe({
            next: (element: Imagen) => {
              respuesta.push(element);
              this.createSuccess("Se actualizo la informacion de tus sliders");
            },
            error: (error) => {
              this.createError("Error actualizando Imagen");
            },
            complete: () => { authServ.unsubscribe(); }
          });
      });
      this.sliders = respuesta;
    }
    this.blockUI.stop();
  }
  eliminarFoto(value: Imagen) {
    this.blockUI.start();
    let index = this.sliders.findIndex((element: Imagen) => {
      return element.id == value.id;
    });
    if (index >= 0) {
      const authServ = this.authService
        .deleteImage(Number(value.id))
        .subscribe({
          next: (element: Imagen) => {
            if (value) {
              this.createSuccess("Se elimino la imagen correctamente");
              this.blockUI.stop();
              this.obtenerSliders()
            }
          },
          error: (error) => {
            this.createError("Imagen no se pudo Eliminar");
            if (error.indexOf('401') >= 0) {
              this.mySesion.navegar({ url: './logout' })
            }
            console.log(error);
          },
          complete: () => { authServ.unsubscribe(); }
        });
    } else {
      this.createError("Imagen no encontrada");
    }
    this.blockUI.stop();
  }
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200,
  };
  createSuccess(success: string) {
    this._service.success("¡Éxito!", success);
  }
  createError(error: string) {
    this._service.error("¡Error!", error);
  }
  createWarning(error: string) {
    this._service.warn("¡Cuidado!", error);
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
