import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@2sic.com/dnn-sxc-angular';

@Injectable()
export class DataService {

  constructor(
    private dnnData: Data,
    private http: HttpClient,
  ) {
    this.dnnData
      .content('AppList')
      .get()
      .subscribe(
        result => console.log({result}),
        error => console.log({error}),
      );
  }
}
