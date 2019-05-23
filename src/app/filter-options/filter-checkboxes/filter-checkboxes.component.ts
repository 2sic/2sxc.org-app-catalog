import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCategoryGroup, FilterOption } from '../filter-options.interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterOptionsService } from '../fiter-options.services';

@Component({
  selector: 'app-filter-checkboxes',
  templateUrl: './filter-checkboxes.component.html',
  styleUrls: ['./filter-checkboxes.component.scss']
})
export class FilterCheckboxesComponent implements OnInit {

  @Input() titlePrefix: string = null;
  @Input() checkboxGroups: Observable<FilterCategoryGroup[]> = new Observable<FilterCategoryGroup[]>();

  private fixKeys = {showAll: 'all', old: 'old', stable: 'Stable / For Use in Live Sites'};
  public checkboxForm: FormGroup = new FormGroup({
    [this.fixKeys.showAll]: new FormControl(true),
  });

  constructor(private filterService: FilterOptionsService) {}

  ngOnInit() {
    this.checkboxGroups.subscribe((groups: FilterCategoryGroup[]) => {
      groups.forEach((group: FilterCategoryGroup) => group.Options.forEach(
        (option: FilterOption) => {

          if (option.Title === this.fixKeys.old) {
            option.Tag = 'Hide all old Apps';
            option.ShowApps = false;
            this.filterService.setFilter(option);
            this.checkboxForm.addControl(option.Title, new FormControl(true));
          } else {
            this.checkboxForm.addControl(option.Title, new FormControl(false));
          }
      }));
    });
  }

  public fixLabel(option: FilterOption) {
    if (option.Tag === 'Stable / For Use in Live Sites') {
      option.Tag = 'Stable';
    } else if (option.Tag === 'Template App for Getting Started') {
      option.Tag = 'Template';
    }

    return option.Tag;
  }

  public areSomeCheckboxesSelected() {
    return Object.keys(this.checkboxForm.controls)
      .filter(key => !Object.values(this.fixKeys).includes(key) )
      .some(key => this.checkboxForm.get(key).value);
  }

  public showAll() {
    Object.keys(this.checkboxForm.controls)
      .filter(key => !Object.values(this.fixKeys).includes(key) )
      .forEach(key => {
        const filter = this.filterService.selectedFilters.find(f => f.Title === key);
        this.checkboxForm.get(key).setValue(false);
        if (!!filter) {
          this.toggelCheckbox(filter, false);
        }
      });
  }

  public toggelCheckbox(option: FilterOption, state: boolean) {
    if (state) {
      this.filterService.setFilter(option);
    } else {
      this.filterService.removeFilter(option);
    }
  }
}
