import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../components/home-page/home-page';
import { Drop } from '../components/drop/drop';
import { Header } from '../components/header/header';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'bloodGroupForm', component: Drop },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
