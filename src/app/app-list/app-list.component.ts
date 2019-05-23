import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppListItem } from './app-list.interfaces';
import { FilterOptionsService } from '../filter-options/fiter-options.services';
import { AppTypeIds } from './app-list.enums';
import * as moment from 'moment';

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
          const hasNew = moment().subtract(2, 'month').isSameOrBefore( moment(app.Updated), 'day' );
          if (hasNew) {
            app.Type = {Id: -1, Title: 'New', Tag: 'New', Category: null};
            return app;
          }

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
          const sortValue = !app.Type ? 4
            : app.Type.Id === AppTypeIds.new ? 1
              : app.Type.Id === AppTypeIds.top ? 2
                : app.Type.Id === AppTypeIds.stable ? 3
                  : 4;
          return { index, sortValue };
        })
        .sort( (a, b) => a.sortValue - b.sortValue )
        .map( sortItem => apps[sortItem.index] );
    };

    const sortByUpdateDate = (apps: AppListItem[]) => {
      const isAfter = (c: AppListItem, d: AppListItem) => moment(c.Updated).isAfter( moment(d.Updated) );
      const isSame = (c: AppListItem, d: AppListItem) => moment(c.Updated).isSame( moment(d.Updated) );
      const sortDate = (c: AppListItem, d: AppListItem) => +(isAfter(c, d)) || +(isSame(c, d)) - 1;

      return apps.sort( (a, b) => sortDate(a, b) );
    };

    this.appList = this.filterService.appListFiltered
      .pipe(
        map((appList: AppListItem[]) => addType(appList)),
        map((appList: AppListItem[]) => sortByUpdateDate(appList)),
        map((appList: AppListItem[]) => sortByType(appList)),
      );
  }
}
