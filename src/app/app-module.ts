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

@NgModule({
  declarations: [App, Drop, Drown, Showresulits],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App],
})
export class AppModule {}
