import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from '../components/app/app';
import { Drop } from '../components/drop/drop';
import { Drown } from '../components/drown/drown';
import { Showresulits } from '../components/showresulits/showresulits';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from '../components/home-page/home-page';
import { Header } from '../components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [App, Drop, Drown, Showresulits, HomePage, Header],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App],
})
export class AppModule {}
