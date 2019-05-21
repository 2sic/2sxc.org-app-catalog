import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './app-list-item.component.html',
  styleUrls: ['./app-list-item.component.scss']
})
export class AppListItemComponent {

  @Input() app: any = null;

}
