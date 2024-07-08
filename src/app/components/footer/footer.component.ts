import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private _proveedor!: string;
  constructor() { }
  private _year = new Date().getUTCFullYear();

  ngOnInit(): void {
  }

  set footerYear(value: any) {
    this._year = value;
  }

  get footerYear(): any {
    return this._year;
  }
  @Input()
  set proveedor(value: string) {
    this._proveedor = value;
  }

  get proveedor(): string {
    return this._proveedor;
  }
}
