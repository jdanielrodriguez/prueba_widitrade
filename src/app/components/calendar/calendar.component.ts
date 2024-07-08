import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  constructor() { }
  @Input() calendarDate: Date = new Date();
  year = '';
  day = '';
  month = '';
  ngOnInit(): void {
    this.year = this.calendarDate.getFullYear().toString();
    this.day = this.calendarDate.getDate().toLocaleString();
    this.month = this.calendarDate.toLocaleString('default', { month: 'long' }).substring(0,3);
  }
}
