import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCategorys } from '../filter-options.interfaces';

@Component({
  selector: 'app-filter-checkboxes',
  templateUrl: './filter-checkboxes.component.html',
  styleUrls: ['./filter-checkboxes.component.scss']
})
export class FilterCheckboxesComponent implements OnInit {

  @Input() titlePrefix: string = null;
  @Input() checkboxGroups: Observable<FilterCategorys[]> = null;

  constructor() { }

  ngOnInit() {}

}
