import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-modal.component.html'
})
export class ChangePassFormulario implements OnInit {
  private _titulo!: string;
  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
}
