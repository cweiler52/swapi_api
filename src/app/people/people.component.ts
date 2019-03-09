import { Component, OnInit } from '@angular/core';
//import { People } from './models/people.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.getPeople()
  }

  getPeople(): void {
    this.dataService.getPeople()
      .subscribe(data => { this.people = data.results });
  }

}
