import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private _perfil: Perfil = new Perfil();
  private _type!: string;
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
    this.getParams();
  }
  getParams() {
    this.route.paramMap.subscribe(params => {
      const paramType = params.get('tipo');
      this._type = paramType ?? this._type;

      if (this._type === 'settings') {
        this.mySesion.navegar({url: '../dashboard/settings/profile'});
      }
    });
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this._perfil = value;
    this._perfilEmit.emit(this._perfil);
  }
  get perfil(): Perfil {
    return this.mySesion.perfil;
  }
  @Input()
  set type(value: string) {
    this._type = value;
  }
  get type(): string {
    return this._type;
  }

  get active(): number {
    const tabMap: { [key: string]: number } = {
        'my-content': 1,
        'my-favorites': 2,
        'information': 3,
        'landings': 4,
    };

    return tabMap[this._type] ?? tabMap['settings'];
  }

  get rolAdmin(): number {
    return 1;
  }

  get rolCreador(): number {
    return 2;
  }

  get rol(): number {
    let ret = 0;
    this.mySesion.actualizaPerfil();
    const perfil: Perfil = this.mySesion.perfil ? this.mySesion.perfil : (new Perfil());
    if (perfil.rol_id) {
      ret = perfil.rol_id ? perfil.rol_id : 0;
    }
    return ret;
  }
}
