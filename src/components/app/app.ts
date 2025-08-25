import { Component, input, signal } from '@angular/core';
import { genoStaete } from '../drop/drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('blood-dev');

  myBloodType: genoStaete | null = null;

  onBloodChange(genoStaete: genoStaete) {
    this.myBloodType = genoStaete;
  }
}
