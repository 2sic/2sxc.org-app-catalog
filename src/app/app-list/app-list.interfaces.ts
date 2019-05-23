
export interface AppListItemTag {
  Id: number;
  Title: string;
  Tag: string;
  Category: string;
}

export interface AppListItem {
  Id: number;
  Type: AppListItemTag;
  Icon: string;
  Name: string;
  Description: string;
  Tags: Array<AppListItemTag>;
  UrlKey: string;
}
