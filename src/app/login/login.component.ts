import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
