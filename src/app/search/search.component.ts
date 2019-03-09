import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeopleComponent } from '../people/people.component';
import { ShipsComponent } from '../ships/ships.component';
import { FilmsComponent } from '../films/films.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchCriteria = {};
  people = [];
  ships = [];
  films = [];

  constructor(private dbService: DataService) { }

  ngOnInit() {
  }

  searchSubmit() {
    //console.log(this.searchCriteria)
    this.people = [];
    this.ships = [];
    this.films = [];
    switch(this.searchCriteria.endpoint) {
      case 'people':
        this.dbService.search(this.searchCriteria).subscribe(data => this.people = data.results ? data.results : [])
      break;
      case 'starships':
        this.dbService.search(this.searchCriteria).subscribe(data => this.ships = data.results ? data.results : [])
      break;
      case 'films':
        this.dbService.search(this.searchCriteria).subscribe(data => this.films = data.results ? data.results : [])
      break;
    }    
  }
}
