import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ListaBusqueda, Menus } from '../../interfaces';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  private _proveedorEvent: EventEmitter<ListaBusqueda> = new EventEmitter<ListaBusqueda>();
  constructor(
    private router: Router,
    private localSt: LocalStorageService,
  ) { }
  @Input() galleryType = 'grid'
  @Input() lista: ListaBusqueda[] = [];
  @Input() page = 1;
  @Input() size = 100;
  @Input() numReg = 50;
  @Input() tieneDetalle = false;
  @Input() editar!: boolean;
  @Input() eliminarCarrito = false;
  @Input() agregaCarrito = false;
  @Input() categorias = false;
  @Input() adminProv = false;
  @Input() esAdmin = false;
  @Input() autorizaNav = true;
  @Input() pagar = false;
  @Input() proveedor = '';
  @Output() paginaActual: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  get proveedorAut(): EventEmitter<ListaBusqueda> {
    return this._proveedorEvent;
  }

  ngOnInit(): void {
  }

  public saveConfirm(data: Menus, id?: number): void {
    this.autorizaNav = true;
    if (this.autorizaNav) {
      this.router.navigate([data.url]);
    }
  }

  navegar(data: Menus, id?: number, info?: ListaBusqueda) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    if (info) {
      this.autorizaNav = false;
    } else
      if (this.autorizaNav) {
        this.router.navigate([data.url]);
      }
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id + ''));
    }
  }

  cambioPagina(value: any) {
    this.page = value;
    this.paginaActual.emit(this.page);
  }
  getPrecio(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }
  getTotal(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }
  abrir(data: ListaBusqueda): void {
    this.router.navigate([`./contenido/${data.slug}`]);
  }
}
