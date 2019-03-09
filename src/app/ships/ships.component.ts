import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  @Input() ships: any;

  constructor() { }

  ngOnInit() {
  }
}
