import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeopleComponent } from '../people/people.component';
import { ShipsComponent } from '../ships/ships.component';
import { FilmsComponent } from '../films/films.component';
import { Cat } from '../models/category.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // SEARCH CRITERIA
  searchButton: boolean;
  searchCriteria = {};
  searchOptions: Cat[];
  // OVERALL DATA
  people = [];
  ships = [];
  films = [];
  // PEOPLE
  p_films = [];
  p_starships = [];
  // STARSHIPS
  s_pilots = [];
  s_films = [];
  // FILMS
  f_characters = [];
  f_starships = [];

  constructor(private dbService: DataService) { }

  ngOnInit() {
    this.searchOptions = [
      { option: 'People', value: 'people' },
      { option: 'Ships', value: 'starships' }, 
      { option: 'Films', value: 'films' }
    ]
    this.searchCriteria.endpoint = '';
    this.searchButton = false;
  }

  searchSubmit() {
    // console.log(this.searchCriteria)
    this.searchButton = true;
    this.people = [];
    this.ships = [];
    this.films = [];

    switch(this.searchCriteria.endpoint) {
      case 'people':
        this.dbService.search(this.searchCriteria).subscribe(
          data => { 
            for(let info of data.results) {
              // RESET FILMS TO SHOW A LIST OF JUST THE TITLES FOR THE PERSON SEARCHED
              this.p_films = info.films;
              info.films = [];
              for(let film_url of this.p_films) {
                let id = film_url.substr(0, film_url.length-1).split('/').reverse().shift();
                this.dbService.getFilm(id).subscribe(
                  film => { info.films.push(film.title) }
                )
              }

              // RESET STARSHIPS TO SHOW A LIST OF JUST THE NAMES FOR THE PERSON SEARCHED
              this.p_starships = info.starships;
              info.starships = [];
              for(let ship_url of this.p_starships) {
                let id = ship_url.substr(0, ship_url.length-1).split('/').reverse().shift();
                this.dbService.getStarship(id).subscribe(
                  ship => { info.starships.push(ship.name) }
                )
              }
            }
            this.people = data.results;
          }
        )
      break;
      
      case 'starships':
        this.dbService.search(this.searchCriteria).subscribe(
          data => {
            for(let info of data.results) {
              // RESET PILOTS TO SHOW A LIST OF JUST THE NAMES FOR THE STARSHIP SEARCHED
              this.s_pilots = info.pilots;
              info.pilots = [];
              for(let pilot_url of this.s_pilots) {
                let id = pilot_url.substr(0, pilot_url.length-1).split('/').reverse().shift();
                this.dbService.getStarship(id).subscribe(
                  pilot => { info.pilots.push(pilot.name) }
                )
              }
              //console.log('pilots', info.pilots)

              // RESET FILMS TO SHOW A LIST OF JUST THE TITLES FOR THE STARSHIP SEARCHED
              let fcnt = 0;
              this.s_films = info.films;
              info.films = [];
              for(let film_url of this.s_films) {
                let id = film_url.substr(0, film_url.length-1).split('/').reverse().shift();
                this.dbService.getFilm(id).subscribe(
                  film => { info.films.push(film.title) }
                )
              }
              //console.log('films', info.films)
            }
            this.ships = data.results;
          }
        )
      break;
      
      case 'films':
        this.dbService.search(this.searchCriteria).subscribe(
          data => { 
            for(let info of data.results) {
              // RESET CHARACTORS TO SHOW A LIST OF JUST THE NAMES FOR THE FILM SEARCHED
              this.f_characters = info.characters;
              info.characters = [];
              for(let character_url of this.f_characters) {
                let id = character_url.substr(0, character_url.length-1).split('/').reverse().shift();
                this.dbService.getPeople(id).subscribe(
                  character => { info.characters.push(character.name) }
                )
              }
              
              // RESET STARSHIPS TO SHOW A LIST OF JUST THE NAMES FOR THE FILM SEARCHED
              this.f_starships = info.starships;
              info.starships = [];
              for(let ship_url of this.f_starships) {
                let id = ship_url.substr(0, ship_url.length-1).split('/').reverse().shift();
                this.dbService.getStarship(id).subscribe(
                  starship => { info.starships.push(starship.name) }
                )
              }
            }
            this.films = data.results;
          }
        )
      break;
    } 
    this.searchCriteria.endpoint = '';   
  }
}
