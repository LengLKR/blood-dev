import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  standalone: false,
  templateUrl: './tree.html',
  styleUrl: './tree.scss',
})
export class Tree implements OnInit {
  ngOnInit(): void {}
}
