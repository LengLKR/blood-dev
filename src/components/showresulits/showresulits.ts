import { Component } from '@angular/core';

@Component({
  selector: 'app-showresulits',
  standalone: false,
  templateUrl: './showresulits.html',
  styleUrl: './showresulits.scss',
})
export class Showresulits {
  title = 'angular-project';
  isVisible: boolean = true;
  friendslist = [
    {
      name: 'Nishant',
      age: 25,
    },
    {
      name: 'Shailesh',
      age: 23,
    },
    {
      name: 'Leng',
      age: 26,
    },
    {
      name: 'Noo',
      age: 29,
    },
    {
      name: 'LKR',
      age: 24,
    },
    {
      name: 'IOT',
      age: 30,
    },
  ];
  productList = [
    {
      name: 'chicken',
      price: 2500,
    },
    {
      name: 'popcon',
      price: 50000,
    },
    {
      name: 'pork',
      price: 75000,
    },
  ];

  numbertoCheck = 7;
  isOdd(num: number): boolean {
    return num % 2 !== 0;
  }

  workToCheck = 'hello';
  upperCase() {
    this.workToCheck = this.workToCheck.toUpperCase();
  }
  number = 5;
  SquareNumber() {
    this.number = Math.pow(this.number, 2);
  }

  worktocheck = 'hello';
  workToCheck2 = 'world';

  Concatenate_Two_String() {
    return this.workToCheck + ' ' + this.workToCheck2;
  }

  listcheck = 'Java';
  Get_First_Charater() {
    alert(this.listcheck[0]);
  }

  num1 = 3;
  num2 = 7;
  Multiply_Two_Number() {
    return this.num1 * this.num2;
  }

  checkTolength = 'developer';
  Length_of_String() {
    return this.checkTolength.length;
  }

  ContainsToCheck = 'fullstack';
  Check_OF_String(str: string): boolean {
    return str.includes('a');
  }

  Words = 'i love coding';
  Reverse_Words_in_Sentence() {
    // const Words3 = this.Words.split(' ');
    // const Rever_words = Words3.reverse();
    // const str = Rever_words.join(' ');
    // // console.log('str: ' + str);
    // console.log('Rever_words: ', Rever_words);
    // console.log('Words3: ', Words3);
    // const str = this.Words.split(' ').reverse().join(' ');
    return this.Words.split(' ').reverse().join(' ');
  }

  longest(str: string) {
    str = 'I am fulstack developer';
    const words = str.split(' ');
    const longest = '';
  }
}
