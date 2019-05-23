import { Injectable } from '@angular/core';
import { AppListItem, AppListItemTag } from '../app-list/app-list.interfaces';
import { DataService } from '../data-service/data.service';
import { FilterCategoryGroup, FilterOption } from './filter-options.interfaces';
import { Subject } from 'rxjs';

@Injectable()
export class FilterOptionsService {

  public selectedFilters: FilterOption[] = [];
  public filterGroups: Subject<FilterCategoryGroup[]> = new Subject<FilterCategoryGroup[]>();

  private appList: AppListItem[] = [];
  public appListFiltered: Subject<AppListItem[]> = new Subject<AppListItem[]>();

  constructor(private dataService: DataService) {
    this.dataService.appList.subscribe( (appList: AppListItem[]) => {
      this.appList = appList;
      this.filterAppList(appList);
    });
    this.dataService.tagList.subscribe( (tagList: AppListItemTag[]) => {
      const groups = this.createFilterGroups(tagList);
      this.filterGroups.next(groups);
    });
  }

  public filterAppList(appList: AppListItem[] = this.appList) {

    const appHasFilter = (app: AppListItem, filter: FilterOption) => app.Tags.some( tag => filter.Id === tag.Id );
    const appHasSomeFilters = (app: AppListItem, filters: FilterOption[]) => filters.some( filter => appHasFilter(app, filter) );
    const appHasAllFilters = (app: AppListItem, filters: FilterOption[]) => filters.every( filter => appHasFilter(app, filter) );
    const splitShowHideFilters = (filters: FilterOption[]) => filters.reduce(
      (obj, filter) => {
        if (filter.ShowApps) {
          obj.showFitlers.push(filter);
        } else {
          obj.hideFilters.push(filter);
        }
        return obj;
      },
      {showFitlers: [], hideFilters: []}
    );

    const filterApps = (apps: AppListItem[]) => {

      // If only Filters with ShowApps=false are selected, show the unselected apps
      const showUnselected = this.selectedFilters.every(filter => !filter.ShowApps);

      if (showUnselected) {
        const unselectedApps = apps.filter( app => !appHasSomeFilters(app, this.selectedFilters) );
        return unselectedApps;
      } else {
        const {showFitlers, hideFilters} = splitShowHideFilters(this.selectedFilters);
        const onlyShowApps = apps.filter( app => !appHasSomeFilters(app, hideFilters) );
        const selectedApps = onlyShowApps.filter( app => appHasAllFilters(app, showFitlers) );
        return selectedApps;
      }
    };

    const filteredApps = this.selectedFilters.length > 0 ? filterApps(appList) : appList;
    this.appListFiltered.next(filteredApps);
  }

  private createFilterGroups(tags: AppListItemTag[]): FilterCategoryGroup[] {

    const ignoreTags = ['Beta'];

    return tags.reduce((groups: FilterCategoryGroup[], tag: AppListItemTag) => {

      if (ignoreTags.includes(tag.Title)) {
        return groups;
      }

      const category = groups.find(group => group.Category === tag.Category);
      const option = this.createFilterOption(tag);

      if (category) {
        category.Options.push(option);
      } else {
        const newGroup = {Category: tag.Category, Options: [option]};
        groups.push(newGroup);
      }

      return groups;

    }, new Array<FilterCategoryGroup>());
  }

  private createFilterOption(tag: AppListItemTag) {
    const {Id, Tag, Title, Category} = tag;
    return {Id, Tag, Title, Category, ShowApps: true} as FilterOption;
  }

  public setFilter(filter: FilterOption) {
    const isAlreadyFiltered = this.selectedFilters.some((selected) => selected.Id === filter.Id);

    if (!isAlreadyFiltered) {
      this.selectedFilters.push(filter);
    }

    this.filterAppList();
  }

  public removeFilter(filter: FilterOption) {
    const index = this.selectedFilters.findIndex((selected) => selected.Id === filter.Id);

    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    }

    this.filterAppList();
  }
}
