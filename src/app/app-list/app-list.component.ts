import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  public appList: Observable<any> = null;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.appList = this.data.getAppList();
  }

}
