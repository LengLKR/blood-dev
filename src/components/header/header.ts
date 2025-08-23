import { Component } from '@angular/core';
import { faCross } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: false, // ตามที่คุณใช้
})
export class Header {
  faCross = faCross;
}
