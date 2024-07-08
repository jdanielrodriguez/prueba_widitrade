import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ListaBusqueda } from '../../interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor() { }
  private _data: ListaBusqueda = new ListaBusqueda();
  private _lista: ListaBusqueda[] = [];
  private _tieneDetalle = false;
  private _editar!: boolean;
  private _eliminarCarrito = false;
  private _agregaCarrito = false;
  private _categorias = false;
  private _adminProv = false;
  private _esAdmin = false;
  private _autorizaNav = true;
  private _pagar = false;
  private _proveedor = '';

  ngOnInit(): void {
  }

  getUrl(data: ListaBusqueda): string {
    return ((data.imagenes!=null && data.imagenes.length>0)?data.imagenes[0].url:data.imagen?data.imagen:'https://via.placeholder.com/250X200?text=X');
  }

  resetCarrito(value?: ListaBusqueda): boolean {
    let ret = false;
    if (!this.agregaCarrito && !this.eliminarCarrito && !this.esAdmin) {
    }
    return ret;
  }

  public handleRefusal(dismissMethod?: any): void {
    this._autorizaNav = true;
  }
  autorizarProveedor(value?: ListaBusqueda) {
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
  pruebaConfirm(){

  }

  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value === true;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Input()
  set pagar(value: boolean) {
    this._pagar = value === true;
  }
  get pagar(): boolean {
    return this._pagar;
  }
  @Input()
  set categorias(value: boolean) {
    this._categorias = value === true;
  }
  get categorias(): boolean {
    return this._categorias;
  }
  @Input()
  set tieneDetalle(value: boolean) {
    this._tieneDetalle = value === true;
  }
  get tieneDetalle(): boolean {
    return this._tieneDetalle;
  }
  @Input()
  set agregaCarrito(value: boolean) {
    this._agregaCarrito = value === true;
  }
  get agregaCarrito(): boolean {
    return this._agregaCarrito;
  }
  @Input()
  set eliminarCarrito(value: boolean) {
    this._eliminarCarrito = value === true;
  }
  get eliminarCarrito(): boolean {
    return this._eliminarCarrito;
  }
  @Input()
  set adminProv(value: boolean) {
    this._adminProv = value === true;
  }
  get adminProv(): boolean {
    return this._adminProv;
  }
  @Input()
  set lista(value: ListaBusqueda[]) {
    this._lista = value;
  }
  get lista(): ListaBusqueda[] {
    return this._lista;
  }
  @Input()
  set data(value: ListaBusqueda) {
    this._data = value;
  }
  get data(): ListaBusqueda {
    return this._data;
  }
  get proveedorAutStr(): ListaBusqueda {
    return new ListaBusqueda();
  }
  @Input()
  set editar(value: boolean) {
    this._editar = value;
  }

  get editar(): boolean {
    return this._editar;
  }
}
