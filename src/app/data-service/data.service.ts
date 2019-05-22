import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppListItem, AppListItemTag, AppTypeIds } from '../app-list/app-list.interfaces';
import { AppCatalogDescription } from '../description/description.intefaces';

@Injectable()
export class DataService {

  constructor(
    private dnnData: Data,
    private http: HttpClient,
  ) {}

  public getDescription(): Observable<AppCatalogDescription[]> {
    return this.dnnData
      .content<AppCatalogDescription>('AppCatalogSettings')
      .get()
      ;
  }

  public getAppListTags(): Observable<AppListItemTag[]> {
    return this.dnnData
      .query< {Apps: Array<AppListItem>, Tags: Array<AppListItemTag>}>('AppList')
      .get()
      .pipe(map((result: {Apps: Array<AppListItem>, Tags: Array<AppListItemTag>}) => result.Tags))
      ;
  }

  public getAppList(): Observable<AppListItem[]> {

    return this.dnnData
      .content<AppListItem>('App')
      .get()
      .pipe(map((appList: AppListItem[]) => {
        appList.map((app: AppListItem) => {
            const isTop = app.Tags.find(t => t.Id === AppTypeIds.top);
            const isStabel = app.Tags.find(t => t.Id === AppTypeIds.stable);

            app.Type = isTop ? isTop
              : isStabel ? isStabel
                : null;

            return app;
        });
        return appList;
      }))
      ;
  }
}
