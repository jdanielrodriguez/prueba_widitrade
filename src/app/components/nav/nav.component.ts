import { Component, AfterViewInit, HostListener, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Menus, Perfil } from './../../interfaces';
import { Sesion } from './../../common/sesion';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  private _menus!: Menus[];
  private _proveedores!: string;
  private _proveedor!: string;
  private _color!: string;
  private _background!: string;
  private _sesion!: boolean;
  private _esAdmin!: boolean;
  private _perfil!: Perfil;
  private _logo = 'assets/images/logo.png';
  constructor(
    private router: Router,
    private mySesion: Sesion,
    private cdref: ChangeDetectorRef,
    private localSt: LocalStorageService
  ) { }
  public isMenuCollapsed = true;
  public isFullScreeen = window.screen.width > 500;
  ngOnInit(): void {
    this.iniciarMenus();
    this.validarSesion();
  }
  validarSesion() {
    this.mySesion.actualizaPerfil();
  }
  cargarConfig() {
    if (!this.esAdmin) {
    }
  }
  navegar(data: Menus, id?: number, evento?: MouseEvent, inicio?: boolean) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    if (evento) {
      evento.stopPropagation();
    }
    this.router.navigate([data.url]);
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id + ''));
    }
  }
  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreen();
  }
  ngAfterViewInit() {
    this._sesion = this.mySesion.validarSesion();
    this.detectScreen();
    this.validarSesion();
    this.mySesion.actualizaPerfil();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.cargarConfig();
    if (this._logo && this._logo.length <= 0) {
      this._logo = 'assets/images/logo.png';
    }
    this.cdref.detectChanges();
  }
  private detectScreen() {
    this.isFullScreeen = window.screen.width > 500;
  }
  iniciarMenus(): void {
    this._menus = [
      {
        sesion: false,
        select: false,
        url: '../',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: true,
        select: false,
        url: '../',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: false,
        select: false,
        url: '../login',
        evento: null,
        nombre: 'Ingresar'
      },
      {
        sesion: false,
        select: false,
        url: '../register',
        evento: null,
        nombre: 'Registrarse'
      },
      {
        sesion: true,
        select: false,
        url: '../dashboard',
        evento: null,
        nombre: 'Dashboard',
        submenu: [
          {
            sesion: true,
            select: false,
            url: '../dashboard/my-content',
            evento: null,
            rol: 2,
            nombre: 'Mi Contenido'
          },{
            sesion: true,
            select: false,
            url: '../dashboard/my-favorites',
            evento: null,
            nombre: 'Mi Contenido Favorito'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/information',
            evento: null,
            nombre: 'Mi Perfil'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/landings',
            evento: null,
            rol: 1,
            nombre: 'Landing de Productos'
          },
          {
            sesion: true,
            select: false,
            url: '../logout',
            nombre: 'Salir'
          }
        ]
      }
    ];
  }
  @Input()
  set menus(values: Menus[]) {
    this._menus = values;
  }
  get menus(): Menus[] {
    return this._menus;
  }
  @Input()
  set logo(values: string) {
    this._logo = values;
  }
  get logo(): string {
    return this._logo;
  }
  set perfil(values: Perfil) {
    this._perfil = values;
  }
  get perfil(): Perfil {
    this._perfil = this.mySesion.perfil;
    return this._perfil;
  }
  set sesion(value: boolean) {
    this._sesion = value;
  }
  get sesion(): boolean {
    this._sesion = this.mySesion.validarSesion();
    return this._sesion;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Input()
  set proveedores(value: string) {
    this._proveedores = value;
  }
  get proveedores(): string {
    return this._proveedores;
  }
  set proveedor(value: string) {
    this._proveedor = value;
  }
  get proveedor(): string {
    return this._proveedor + (this._proveedor.length > 0 ? '/' : '');
  }
  @Input()
  set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color;
  }
  @Input()
  set background(value: string) {
    this._background = value;
  }
  get background(): string {
    return this._background;
  }
  getColor(): any {
    this.cargarConfig();
    if (this._color) {
      return { color: this._color };
    }
  }
  getBackground(): any {
    this.cargarConfig();
    if (this._background) {
      return { 'background-color': this._background };
    }
  }
  get currentPerfil(): string {
    return '';
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
  get actualizarPass(): boolean {
    return this.perfil.state === 21;
  }
}
