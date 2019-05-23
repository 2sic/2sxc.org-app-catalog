import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { Observable, from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppListItem, AppListItemTag } from '../app-list/app-list.interfaces';
import { AppTypeIds } from '../app-list/app-list.enums';
import { AppCatalogDescription } from '../description/description.intefaces';

@Injectable()
export class DataService {

  public appList: Subject<AppListItem[]> = new Subject<AppListItem[]>();
  public tagList: Subject<AppListItemTag[]> = new Subject<AppListItemTag[]>();

  constructor(
    private dnnData: Data,
  ) {
    this.loadAppsAndTags();
  }

  public getDescription(): Observable<AppCatalogDescription[]> {
    return this.dnnData
      .content<AppCatalogDescription>('AppCatalogSettings')
      .get()
      ;
  }

  private loadAppsAndTags() {
    return this.dnnData
      .query<{Apps: AppListItem[], Tags: Array<AppListItemTag>}>('AppList')
      .get()
      .subscribe(({Apps, Tags}) => {
        this.appList.next(Apps);
        this.tagList.next(Tags);
      });
  }
}
