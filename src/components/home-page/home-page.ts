import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  word1: string = 'I love coding';
  ngOnInit() {
    console.log('sfsdf');
  }

  returnWord1() {
    return this.word1.split(/\s+/).reverse().join(' ');
  }

  word2: string = 'i am fullstack developer';
  findLongestWord(): string {
    return this.word2
      .trim() //ตัดช่องว่างหน้า-หลัง
      .split(/\s+/) //แยกคำหลายช่องว่าง
      .reduce(
        (longest, word2) => (word2.length > longest.length ? word2 : longest),
        ''
        //หา word ที่ยาว
      );
  }

  User: { id: number; name: string; role: string }[] = [
    { id: 1, name: 'a', role: 'USER' },
    { id: 2, name: 'b', role: 'ADMIN' },
  ];
}
