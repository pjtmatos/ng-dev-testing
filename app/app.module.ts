import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimeSelectComponent } from './time-select.component';
import { DateSelectComponent } from './date-select.component';
import { IncrementValueComponent } from './increment-value.component';
import { FillCharPipe } from './fill-char.pipe';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { ReturnAsTabDirective } from './return-as-tab.directive';

import { TimeInputDirective } from './time-input.directive';
import { DashboardMetricaComponent } from './dashboard-metrica/dashboard-metrica.component';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';

TimeInputDirective;
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [
    AppComponent,
    TimeSelectComponent,
    DateSelectComponent,
    IncrementValueComponent,
    FillCharPipe,
    OnlyNumbersDirective,
    TimeInputDirective,
    ReturnAsTabDirective,
    DashboardMetricaComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );
  }
}
