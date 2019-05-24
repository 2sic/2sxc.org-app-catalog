import { Injectable } from '@angular/core';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { Subject } from 'rxjs';
import { AppListItem, AppListItemTag } from '../app-list/app-list.interfaces';


@Injectable()
export class DataService {

  public appList: Subject<AppListItem[]> = new Subject<AppListItem[]>();
  public tagList: Subject<AppListItemTag[]> = new Subject<AppListItemTag[]>();

  constructor(
    private dnnData: Data,
  ) {
    this.loadAppsAndTags();
  }

  private loadAppsAndTags(): void {
    this.dnnData
      .query<{Apps: AppListItem[], Tags: Array<AppListItemTag>}>('AppList')
      .get()
      .subscribe(({Apps, Tags}) => {
        this.appList.next(Apps);
        this.tagList.next(Tags);
      });
  }
}
