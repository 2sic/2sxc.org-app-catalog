
export interface FilterOption {
  id: number;
  label: string;
  value: boolean;
}

export interface FilterCategorys {
  category: string;
  options: Array<FilterOption>;
}
