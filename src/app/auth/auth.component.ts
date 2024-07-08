import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from "./../interfaces";
import { Sesion } from "./../common/sesion";
import { AuthServices } from "./../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public uuid = '';
  public authProfile = '';
  public titulo = '';
  constructor(
    private route: ActivatedRoute,
    private authServices: AuthServices,
    private mySesion: Sesion,
  ) { }

  ngOnInit(): void {
    this.getParams();
  }
  getParams() {
    this.uuid = this.route.snapshot.paramMap.get("uuid") || '';
    if (this.uuid != '') {
      this.restore(this.uuid);
    }
  }
  restore(uuid: string) {
    let dat: any = {
      uuid: btoa(uuid)
    }
    const authServ = this.authServices.recovery(dat)
      .subscribe({
        next: (response: Response) => {
          if (response.status != 200) {
            this.mySesion.createError('No se encuentra el usuario ingresado');
            this.mySesion.loadingStop();
            return;
          }
          const perfil = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
          this.authProfile = (perfil && response.objeto) ? response.objeto : '';
          this.mySesion.loadingStop();
        },
        error: async (error: any) => {
          this.mySesion.createError('No se encuentra el usuario ingresado');
          this.mySesion.loadingStop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
}
