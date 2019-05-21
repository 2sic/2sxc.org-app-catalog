import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterCategorys } from './filter-options.interfaces';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})
export class FilterOptionsComponent implements OnInit {

  public titlePrefix = 'Filter by';

  public filterCheckboxes: Observable<FilterCategorys[]> = null;
  public filterSelects: Observable<FilterCategorys[]> = null;

  constructor(private data: DataService) { }

  ngOnInit() {
    const source = this.data.getFilterCategorys();

    const checkboxCategorys = ['release-type'];
    this.filterCheckboxes = source.pipe(map( (groups: FilterCategorys[]) =>
      groups.filter((group) => checkboxCategorys.includes(group.category))
    ));

    const selectCategorys = ['complexity', 'technology', 'tag'];
    this.filterSelects = source.pipe(map( (groups: FilterCategorys[]) =>
      groups.filter((group) => selectCategorys.includes(group.category))
    ));
  }

}
