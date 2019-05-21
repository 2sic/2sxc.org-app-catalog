import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCategorys } from '../filter-options.interfaces';

@Component({
  selector: 'app-filter-selects',
  templateUrl: './filter-selects.component.html',
  styleUrls: ['./filter-selects.component.scss']
})
export class FilterSelectsComponent implements OnInit {

  @Input() titlePrefix: string = null;
  @Input() selectGroups: Observable<FilterCategorys[]> = null;

  constructor() { }

  ngOnInit() {}

}
