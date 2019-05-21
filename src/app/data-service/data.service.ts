import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@2sic.com/dnn-sxc-angular';
import { Observable, from } from 'rxjs';
import { FilterCategorys } from '../filter-options/filter-options.interfaces';

@Injectable()
export class DataService {

  constructor(
    private dnnData: Data,
    private http: HttpClient,
  ) {
    /*
    this.dnnData
      .content('AppList')
      .get()
      .subscribe(
        result => console.log({result}),
        error => console.log({error}),
      );
    */
  }

  public getDescription() {
    const dummyData = [{
      title: 'App Catalog',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est',
    }];

    return from(dummyData);
  }

  public getFilterCategorys(): Observable<FilterCategorys[]> {
    const dummyData = [
      {
        category: 'release-type',
        options: [
          {id: 0, label: 'Show All', value: true},
          {id: 1, label: 'Feature-Demo', value: false},
          {id: 2, label: 'Template App for Getting', value: false},
          {id: 3, label: 'Stable / For Use in Live Sites', value: false},
          {id: 4, label: 'Tutorial', value: false},
          {id: 5, label: 'Hide all old Apps', value: true},
        ],
      },
      {
        category: 'complexity',
        options: [
          {id: 0, label: 'Show All', value: true},
          {id: 1, label: 'test 1', value: false},
          {id: 2, label: 'test 2', value: false},
        ],
      },
      {
        category: 'technology',
        options: [
          {id: 0, label: 'Show All', value: true},
          {id: 1, label: 'test 1', value: false},
          {id: 2, label: 'test 2', value: false},
        ],
      },
      {
        category: 'tag',
        options: [
          {id: 0, label: 'Show All', value: true},
          {id: 1, label: 'test 1', value: false},
          {id: 2, label: 'test 2', value: false},
        ],
      },
    ] as FilterCategorys[];

    return from([dummyData]);
  }
}
