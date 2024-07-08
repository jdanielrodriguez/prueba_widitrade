import { Component, OnInit, Output, ViewChild, EventEmitter, Input, ElementRef } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ListaBusqueda } from '../../interfaces';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _lista: ListaBusqueda[] = [];
  private _titulo = '';
  private _seleccion: ListaBusqueda = new ListaBusqueda();
  public imagenDefault = 'https://via.placeholder.com/250x200?text=Logo';
  private _seleccionador: EventEmitter<ListaBusqueda> = new EventEmitter<ListaBusqueda>();
  private _seleccionado: ListaBusqueda = new ListaBusqueda();
  constructor() { }
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  ngOnInit(): void {
    if (this._seleccionado.id) {
      this._seleccionador.emit(this._seleccionado);
    }
  }
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !(this.instance ? this.instance.isPopupOpen() : true)));
    const inputFocus$ = this.focus$;

    // return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
    //   map(term => (term === '' ? this._lista
    //     : this._lista.filter((v: ListaBusqueda) => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    // );
  }
  limpiarValor(value: any, option: any) {
    const temp: ListaBusqueda = new ListaBusqueda();
    this._seleccionado = temp;
    this._seleccionador.emit(this._seleccionado);
  }
  seleccionarValor(value: any, option: any) {
    this.blockUI.start();
    let temp: ListaBusqueda = new ListaBusqueda();
    const index = this._lista.findIndex((element: ListaBusqueda) => element.id === value.id);
    if (index >= 0) {
      temp = this._lista[index];
    }
    if (temp.nombre) {
      this._seleccionado = temp;
    }
    this._seleccionador.emit(this._seleccionado);
    this.blockUI.stop();
  }
  resultFormatBandListValue(value: ListaBusqueda) {
    return value.nombre;
  }
  inputFormatBandListValue(value: ListaBusqueda) {
    if (value.nombre) {
      return value.nombre;
    } else {
      try {
        return this._seleccion.nombre;
      } catch (error) {
      }
    }
    return '';


  }
  @Input()
  set lista(value: ListaBusqueda[]) {
    this._lista = value;
  }
  get lista(): ListaBusqueda[] {
    return this._lista;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  @Input()
  set seleccion(value: ListaBusqueda) {
    if (value) {
      const index = this._lista ? this._lista.findIndex(element => element.id === value.id) : -1;
      const select: ListaBusqueda = index >= 0 ? this._lista[index] : (new ListaBusqueda());
      if (value && value.id === null) {
        this._seleccionado = new ListaBusqueda();
        this._seleccion = new ListaBusqueda();
      } else {
        this._seleccion = select;
        this._seleccionado = select;
      }
    }
  }
  get seleccion(): ListaBusqueda {
    return this._seleccion;
  }

  @Output()
  get seleccionador(): EventEmitter<ListaBusqueda> {
    this._seleccionador.emit(this._seleccionado);
    return this._seleccionador;
  }
  get seleccionado(): ListaBusqueda {
    return this._seleccionado;
  }
}
