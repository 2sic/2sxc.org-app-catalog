import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCategoryGroup, FilterOption } from '../filter-options.interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { FilterOptionsService } from '../fiter-options.services';

@Component({
  selector: 'app-filter-selects',
  templateUrl: './filter-selects.component.html',
  styleUrls: ['./filter-selects.component.scss']
})
export class FilterSelectsComponent implements OnInit {

  @Input() titlePrefix: string = null;
  @Input() selectGroups: Observable<FilterCategoryGroup[]> = null;

  public selectForm: FormGroup = new FormGroup({});

  constructor(private filterService: FilterOptionsService) {}

  ngOnInit() {
    this.selectGroups.subscribe((groups: FilterCategoryGroup[]) => {
      groups.forEach((group: FilterCategoryGroup) => {
        this.selectForm.addControl(group.Category, new FormControl(false));
      });
    });
  }

  handleFilterSelection($event: MatOptionSelectionChange) {
    if ($event.source.selected) {
      this.filterService.setFilter($event.source.value);
    } else {
      this.filterService.removeFilter($event.source.value);
    }
  }

  isSelected(select: FilterOption, option: FilterOption) {
    return option && option.Id === select.Id;
  }
}
