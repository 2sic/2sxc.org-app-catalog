import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DnnInterceptor, RuntimeSettings } from '@2sic.com/dnn-sxc-angular';
import { DnnDevSettings } from './dev/dnn-dev-settings';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatCheckboxModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  MatChipsModule,
  MatTooltipModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppListComponent } from './app-list/app-list.component';
import { AppListItemComponent } from './app-list/app-list-item/app-list-item.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { DescriptionComponent } from './description/description.component';
import { DataService } from './data-service/data.service';
import { FilterCheckboxesComponent } from './filter-options/filter-checkboxes/filter-checkboxes.component';
import { FilterSelectsComponent } from './filter-options/filter-selects/filter-selects.component';
import { FilterOptionsService } from './filter-options/fiter-options.services';

const providers: Provider[] = [
  DnnInterceptor,
  DataService,
  FilterOptionsService,
];

if (!environment.production) {
  providers.push({ provide: RuntimeSettings, useValue: DnnDevSettings });
}

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppListItemComponent,
    FilterOptionsComponent,
    DescriptionComponent,
    FilterCheckboxesComponent,
    FilterSelectsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
