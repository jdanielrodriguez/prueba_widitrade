import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-renderer',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() contentList: any[] = [];
}
