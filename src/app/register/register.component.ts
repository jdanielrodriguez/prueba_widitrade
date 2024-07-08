import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _dinamicLink = '';
  constructor(
  ) { }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  get dinamicLink(): string {
    return this._dinamicLink;
  }
}
