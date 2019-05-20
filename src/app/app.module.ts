import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppListComponent } from './app-list/app-list.component';
import { AppListItemComponent } from './app-list/app-list-item/app-list-item.component';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppListItemComponent,
    FilterOptionsComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
