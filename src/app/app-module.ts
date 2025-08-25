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

import { Showresulits } from '../components/showresulits/showresulits';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from '../components/home-page/home-page';
import { Header } from '../components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Tree } from '../components/tree/tree';
@NgModule({
  declarations: [App, Drop, Showresulits, HomePage, Header, Tree],
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
