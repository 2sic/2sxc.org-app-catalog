import { AppListItemTag } from '../app-list/app-list.interfaces';
export interface FilterOption extends AppListItemTag {
  ShowApps: boolean;
}

export interface FilterCategoryGroup {
  Category: string;
  Options: Array<any>;
}
