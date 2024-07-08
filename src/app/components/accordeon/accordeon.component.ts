import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ListaBusqueda } from '../../interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./accordeon.component.scss']
})
export class AccordeonComponent implements OnInit {
  constructor(
    private mySesion: Sesion,
  ) { }
  @Input() data: ListaBusqueda = new ListaBusqueda();
  @Input() editar!: boolean;
  @Input() esAdmin = false;
  @Input() autorizaNav = true;
  @Input() pagar = false;
  @Input() disabled = false;
  ngOnInit(): void {
    // console.log(this.data);
  }
  comprarBoletos(data: ListaBusqueda): void {
    this.mySesion.navegar({ url: `./localidades/${data.event_slug}/localidad/${data.slug}` });
  }
  getUrl(data: ListaBusqueda): string {
    return ((data.imagenes != null && data.imagenes.length > 0) ? data.imagenes[0].url : data.picture ? data.picture : 'https://via.placeholder.com/200X100?text=X');
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
}
