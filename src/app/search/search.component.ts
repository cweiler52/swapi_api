import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeopleComponent } from '../people/people.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchCriteria = {}
  people = [];
  ships = [];
  films = [];

  constructor(private dbService: DataService) { }

  ngOnInit() {
  }

  searchSubmit() {
    //console.log(this.searchCriteria)
    this.dbService.search(this.searchCriteria)
      .subscribe(data => this.people = data.results)
  }
}
