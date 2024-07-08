import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Imagen } from 'src/app/interfaces';
@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _imagenEliminar: EventEmitter<Imagen> = new EventEmitter<Imagen>();
  private _imagen!: Imagen;
  private _sliders!: Imagen[];
  private _esAdmin!: boolean;
  constructor() { }
  ngOnInit(): void { }
  handleRefusal(value: any) {
    console.log(value);
  }
  removerFoto(value: Imagen) {
    this._imagen = value;
    this._imagenEliminar.emit(this._imagen);
  }
  @Input()
  set sliders(values: Imagen[]) {
    this._sliders = values;
  }
  get sliders(): Imagen[] {
    return this._sliders;
  }
  @Input()
  set esAdmin(values: boolean) {
    this._esAdmin = values;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Output()
  get imagenEliminar(): EventEmitter<Imagen> {
    this._imagenEliminar.emit(this._imagen);
    return this._imagenEliminar;
  }
}
