import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  private _dinamicLink = '';
  constructor() { }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
    this._dinamicLink = './../login';
  }
  get dinamicLink(): string {
    return this._dinamicLink;
  }
}
