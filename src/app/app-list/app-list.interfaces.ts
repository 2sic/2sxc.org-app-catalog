
export interface AppListItemTag {
  Id: number;
  Title: string;
  Tag: string;
  Category: string;
  Priority: number;
}

export interface AppListItem {
  Id: number;
  Type: AppListItemTag;
  IsNew: boolean;
  Icon: string;
  Name: string;
  Description: string;
  Tags: Array<AppListItemTag>;
  UrlKey: string;
  Updated: Date;
}
