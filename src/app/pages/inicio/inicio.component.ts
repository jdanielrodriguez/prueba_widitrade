import { Component, OnInit } from '@angular/core';
import { listaBusqueda, sliders } from './../../default';
import { ListaBusqueda, Locality, ResponseEvent } from './../../interfaces';
import { Sesion } from './../../common/sesion';
import { ContentService } from './../../services/content.service';
declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {
  constructor(
    private mySesion: Sesion,
    private contentService: ContentService
  ) { }

  set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    const actual = (this.page - 1) * this.limit;
    this._offset = actual;
    return this._offset;
  }

  numReg = 0;
  limit = 10;
  private _offset = 0;
  page = 1;
  active = 1;
  galleryType = 'grid';
  sliders = sliders(0);
  mainLista: ListaBusqueda[] = listaBusqueda(20);
  mainListaAuxiliar: ListaBusqueda[] = this.mainLista;

  ngOnInit(): void {
    this.mySesion.hideCaptcha();
    this.getMainList();
  }

  getMainList() {
    this.mySesion.loadingStart();
    const request = this.contentService.getAllActive()
      .subscribe({
        next: (response: ResponseEvent) => {
          this.numReg = response.count || 0;
          this.mainLista.length = 0;
          this.mainListaAuxiliar.length = 0;
          if (!response.cripto) {
            this.mySesion.loadingStop();
            return;
          }
          try {
            const obj = response.cripto ? JSON.parse(this.mySesion.desencriptar(response.cripto)) : null;
            obj.forEach((element: Locality) => {
              const datas: ListaBusqueda = {
                imagen: ('https://via.placeholder.com/250x200'),
                nombre: element.title ? element.title : 'No Name',
                id: element.id,
                slug: element.slug,
                validacion: 5,
              };
              this.mainLista.push(datas);
            });
            this.mainListaAuxiliar = this.mainLista;
          } catch (exception) {
            console.log(exception);
          } finally {
            this.mySesion.loadingStop();
          }
        },
        error: (error) => {
          this.mySesion.loadingStop();
          this.mySesion.createError(error);
        },
        complete: () => { request.unsubscribe(); }
      });
  }

  cambioPagina(value: any) {
    this.page = value;
    this.getMainList();
  }

  needMax() {
    return (this.sliders.length === 0 && ((this.mainLista.length <= 4 && this.galleryType === 'grid') || (this.mainLista.length < 4 && this.galleryType === 'list')))
  }
}
