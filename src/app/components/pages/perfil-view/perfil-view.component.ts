import { Component, OnInit, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Perfil } from 'src/app/interfaces';
declare var $: any;
@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.scss']
})
export class PerfilViewComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _perfil: Perfil = new Perfil();
  private _titulo!: string;
  private _muestraTexto!: boolean;
  private _token!: string;
  private _validacion!: boolean;
  constructor(
  ) { }
  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  @Input()
  set token(value: string) {
    this._token = value;
  }
  get token(): string {
    return this._token;
  }
  get validacion(): boolean {
    return this._validacion;
  }
  @Input()
  set validacion(value: boolean) {
    this._validacion = value;
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
  get proveedor(): any {
    return /* this.perfil.proveedores.length > 0 ? this.perfil.proveedores[0] :  new Proveedor();*/ null;
  }
}
