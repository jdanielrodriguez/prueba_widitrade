import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listaBusqueda, sliders } from './../../default';
import { ListaBusqueda, Locality, ResponseEvent } from './../../interfaces';
import { Sesion } from './../../common/sesion';
import { ContentService } from './../../services/content.service';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: []
})
export class ContenidoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
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
  get mainLista(): ListaBusqueda[] {
    return this._mainList;
  }
  get mainListaAuxiliar(): ListaBusqueda[] {
    return this._mainList;
  }

  public numReg = 0;
  public limit = 10;
  private _offset = 0;
  public page = 1;
  public slug = '';
  public galleryType = 'list';
  public active = 1;
  public sliders = sliders(0);
  private _mainList: ListaBusqueda[] = listaBusqueda(4);
  private _mainListAuxiliar: ListaBusqueda[] = this._mainList;

  ngOnInit(): void {
    this.mySesion.scrollTop();
    this.getParams();
    this.getMainList();
  }

  getParams() {
    this.slug = this.route.snapshot.paramMap.get("slug") || '';
  }

  getMainList() {
    this.mySesion.loadingStart();
    const slug = this.mySesion.encriptar(JSON.stringify(this.slug)) || '';
    const request = this.contentService.getAllByEvent(slug)
      .subscribe({
        next: (response: ResponseEvent) => {
          this._mainList.length = 0;
          this._mainListAuxiliar.length = 0;
          if (!response.cripto) {
            this.mySesion.loadingStop();
            return;
          }
          this.numReg = response.count || 0;
          try {
            const obj = response.cripto ? JSON.parse(this.mySesion.desencriptar(response.cripto)) : null;
            console.log(obj);
            this._mainList = [{
              imagen: ('https://via.placeholder.com/250x200'),
              nombre: obj.name || 'No Name',
              id: obj.id,
              slug: obj.slug,
              event_slug: obj.slug || '',
              validacion: 5,
              date_start: obj.date_start ? new Date(obj.date_start) : new Date(),
              time_start: obj.time_start || '',
              name: obj.name || '',
              description: obj.description || '',
              content: obj.content || '',
              address: obj.address || '',
              price: obj.price || 0,
              total: obj.total || 0,
              tasa_iva: obj.tasa_iva || 0,
              tasa_cambio: obj.tasa_cambio || 0,
            }];
            this._mainListAuxiliar = this._mainList;
          } catch (exception) {
            console.log(exception);
          } finally {
            this.mySesion.loadingStop();
          }
        },
        error: (error) => {
          console.log(error);
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
