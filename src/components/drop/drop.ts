import { Component } from '@angular/core';

@Component({
  selector: 'app-drop',
  standalone: false,
  templateUrl: './drop.html',
  styleUrl: './drop.scss',
})
export class Drop {
  parentDad: 'A' | 'B' | 'AB' | 'O' | null = null;
  selectDad(type: 'A' | 'B' | 'AB' | 'O') {
    this.parentDad = type;
    console.log('parentDad: ', this.parentDad);
  }

  parentMon: 'A' | 'B' | 'AB' | 'O' | null = null;
  selectMon(type: 'A' | 'B' | 'AB' | 'O') {
    this.parentMon = type;
    console.log('parentMon: ', this.parentMon);
  }

  parentPositive: '+' | '-' | null = null;
  selectPositive(type: '+' | '-') {
    this.parentPositive = type;
    console.log('parentPositive: ', this.parentPositive);
  }

  parentNetgative: '+' | '-' | null = null;
  selectNetgative(type: '+' | '-') {
    this.parentNetgative = type;
    console.log(' parentNetgative: ', this.parentNetgative);
  }

  summit() {
    console.log('parentDad: ', this.parentDad);
    console.log('parentMon: ', this.parentMon);
    console.log('parentPositive: ', this.parentPositive);
    console.log(' parentNetgative: ', this.parentNetgative);
  }
}
