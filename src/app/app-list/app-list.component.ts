import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppListItem } from './app-list.interfaces';
import { FilterOptionsService } from '../filter-options/fiter-options.services';
import { AppTypeIds } from './app-list.enums';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  public appList: Observable<AppListItem[]> = null;

  constructor(private filterService: FilterOptionsService) {}

  ngOnInit() {
    const addType = (apps: AppListItem[]) => {
      return apps
        .map(app => {
          const hasTop = app.Tags.find(tag => tag.Id === AppTypeIds.top);
          if (!!hasTop) {
            app.Type = hasTop;
            return app;
          }

          const hasStable = app.Tags.find(tag => tag.Id === AppTypeIds.stable);
          if (!!hasStable) {
            app.Type = hasStable;
            return app;
          }

          const hasOld = app.Tags.find(tag => tag.Id === AppTypeIds.old);
          if (!!hasOld) {
            app.Type = hasOld;
            return app;
          }

          return app;
        });
    };

    const sortByType = (apps: AppListItem[]) => {
      return apps
        .map((app: AppListItem, index: number) => {
          const sortValue = !app.Type ? 3
            : app.Type.Id === AppTypeIds.top ? 1
              : app.Type.Id === AppTypeIds.stable ? 2
                : 3;
          return { index, sortValue };
        })
        .sort( (a, b) => a.sortValue - b.sortValue )
        .map( sortItem => apps[sortItem.index] );
    };

    this.appList = this.filterService.appListFiltered
      .pipe(
        map((appList: AppListItem[]) => addType(appList)),
        map((appList: AppListItem[]) => sortByType(appList)),
      );
  }
}
