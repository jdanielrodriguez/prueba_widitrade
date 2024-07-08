import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: []
})
export class MyInformationComponent implements OnInit {

  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _perfil: Perfil = new Perfil();
  constructor(
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this._perfil = value;
    this._perfilEmit.emit(this._perfil);
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this._perfilEmit.emit(this._perfil);
    return this._perfilEmit;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  get proveedor(): null {
    return null;
  }
}
