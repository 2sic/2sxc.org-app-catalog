import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';
import { AppCatalogDescription } from './description.intefaces';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  public title: string = null;
  public description: string = null;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getDescription()
      .subscribe( (values: AppCatalogDescription[]) => {
        this.title = values[0].Title;
        this.description = values[0].Description;
      });
  }

}
