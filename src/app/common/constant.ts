import { Injectable } from '@angular/core';

@Injectable()
export class Constantes {
  constructor(
  ) { }
  get tasaIva() {
    return this._tasaIva;
  }
  private _tasaIva = 0.12;
}
