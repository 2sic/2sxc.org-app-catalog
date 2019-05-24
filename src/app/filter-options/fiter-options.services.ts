import { Injectable } from '@angular/core';
import { AppListItem, AppListItemTag } from '../app-list/app-list.interfaces';
import { DataService } from '../data-service/data.service';
import { FilterCategoryGroup, FilterOption } from './filter-options.interfaces';
import { Subject } from 'rxjs';
import { CheckboxIds } from './filter-options.enums';

@Injectable()
export class FilterOptionsService {

  public selectedFilters: FilterOption[] = [];

  private tagList: AppListItemTag[] = [];
  public filterGroups: Subject<FilterCategoryGroup[]> = new Subject<FilterCategoryGroup[]>();

  private appList: AppListItem[] = [];
  public appListFiltered: Subject<AppListItem[]> = new Subject<AppListItem[]>();

  constructor(private dataService: DataService) {
    const selectOnInit = [CheckboxIds.old];

    this.dataService.appList.subscribe( (appList: AppListItem[]) => {
      this.appList = appList;
      this.filterAppList(appList);
    });
    this.dataService.tagList.subscribe( (tagList: AppListItemTag[]) => {
      this.tagList = tagList;
      const groups = this.createFilterGroups(tagList, this.appList);
      this.filterGroups.next(groups);
      selectOnInit.forEach(selectId => {
        const select = this.tagList.find(tag => tag.Id === selectId );
        const option = this.createFilterOption(select);
        this.setFilter(option);
      });
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

    const spliteByCategory = (apps: AppListItem[], category: string) => apps.map(app => app.Tags.some(tag => tag.Category === category));
    const filterSelective = (apps: AppListItem[]) => apps.filter( app => appHasAllFilters(app, this.selectedFilters) );
    const filterCumulative = (apps: AppListItem[]) => apps.filter( app => appHasSomeFilters(app, this.selectedFilters) );

    const filterApps = (apps: AppListItem[]) => {

      // If only Filters with ShowApps=false are selected, show the unselected apps
      const showUnselected = this.selectedFilters.every(filter => !filter.ShowApps);

      if (showUnselected) {
        const unselectedApps = apps.filter( app => !appHasSomeFilters(app, this.selectedFilters) );
        return unselectedApps;
      } else {
        const {showFitlers, hideFilters} = splitShowHideFilters(this.selectedFilters);
        const onlyShowApps = apps.filter( app => !appHasSomeFilters(app, hideFilters) );

        // const cumulativeApps, selectiveApps = spliteByCategory(onlyShowApps, 'Release-Type');
        // const first = cumulativeApps.filter( app => appHasSomeFilters(app, showFitlers) );
        // const second = first.concat(first);
        // const


        const selectedApps = onlyShowApps.filter( app => appHasAllFilters(app, showFitlers) );

        return selectedApps;
      }
    };

    const filteredApps = this.selectedFilters.length > 0 ? filterApps(appList) : appList;
    const filteredTags = filteredApps.length > 0 ?
      this.createFilterGroups(this.tagList, filteredApps)
      : this.createFilterGroups(this.tagList, this.appList) ;

    this.filterGroups.next(filteredTags);
    this.appListFiltered.next(filteredApps);
  }

  private filterSelective() {

  }

  private filterCumulative() {

  }

  private createFilterGroups(tagList: Array<AppListItemTag>, appList: AppListItem[]): FilterCategoryGroup[] {

    const options = tagList.map( (tag: AppListItemTag) => {
        const disabled = !appList.some( app => !!app.Tags.find(appTag => tag.Id === appTag.Id) );
        return this.createFilterOption(tag, disabled);
      });

    return options.reduce((groups: FilterCategoryGroup[], option: FilterOption) => {

      const ignoreTags = ['Beta'];
      if (ignoreTags.includes(option.Title)) {
        return groups;
      }

      const category = groups.find(group => group.Category === option.Category);

      if (category) {
        category.Options.push(option);
      } else {
        const newGroup = {Category: option.Category, Options: [option]};
        groups.push(newGroup);
      }

      return groups;

    }, new Array<FilterCategoryGroup>());
  }

  private createFilterOption(tag: AppListItemTag, disabled: boolean = false) {
    const {Id, Tag, Title, Category} = tag;
    let show = true;

    if (Id === CheckboxIds.old) {
      show = false;
      disabled = false;
    }

    return {Id, Tag, Title, Category, Disabled: disabled, ShowApps: show} as FilterOption;
  }

  public setFilter(filter: FilterOption) {
    const isAlreadyFiltered = this.selectedFilters.some((selected) => selected.Id === filter.Id);

    if (!isAlreadyFiltered) {
      this.selectedFilters.push(filter);
      this.filterAppList();
    }
  }

  public removeFilter(filter: FilterOption) {
    const index = this.selectedFilters.findIndex((selected) => selected.Id === filter.Id);

    if (index > -1) {
      this.selectedFilters.splice(index, 1);
      console.log(this.selectedFilters);
      this.filterAppList();
    }
  }
}
