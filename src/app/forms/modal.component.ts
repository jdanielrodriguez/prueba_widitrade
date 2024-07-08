import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class Modal implements OnInit {
  private _url!: string;
  private _titulo!: string;
  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit(): void {
  }
  navegar(value:any){
    this._url = value
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value
  }
  get titulo(): string {
    return this._titulo;
  }
  set url(value: string) {
    this._url = value
  }
  get url(): string {
    return this._url;
  }
  get modulo():number{
    let ret:number = 0
    if(this.url){
      switch (this.url) {
        case './../recovery':{
          ret=2;
          break;
        }
        case './../register':{
          ret=3;
          break;
        }
        case './../login':{
          ret=1;
          break;
        }
        default:{
          ret=0;
          break;
        }
      }
    }
    return ret;
  }
}
