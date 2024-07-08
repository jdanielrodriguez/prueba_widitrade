import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Sesion } from '../../common/sesion';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(
    private localSt: LocalStorageService,
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.localSt.clear('currentPerfil');
    this.localSt.clear('lastLink');
    this.localSt.clear('currentAvatar');
    localStorage.removeItem('currentPerfil');
    localStorage.removeItem('currentAvatar');
    localStorage.removeItem('lastLink');
    localStorage.removeItem('selectedId');
    this.mySesion.lastLink = null;
    this.mySesion.actualizaPerfil();
    if (!this.mySesion.validarSesion()) {
      this.mySesion.navegar({ url: `./` });
    }
  }

}
