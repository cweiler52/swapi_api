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
              this.p_films = [];
              this.p_starships = [];
              // RESET FILMS TO SHOW A LIST OF JUST THE TITLES FOR THE PERSON SEARCHED
              //console.log(data.results[0]);
              for(let film_url of info.films) {
                let id = film_url.substr(0, film_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getFilm(id).subscribe(
                  film => { 
                    // console.log(film);
                    this.p_films.push(film.title);
                  })
              }
              info.films = this.p_films;

              // RESET STARSHIPS TO SHOW A LIST OF JUST THE NAMES FOR THE PERSON SEARCHED
              for(let ship_url of info.starships) {
                let id = ship_url.substr(0, ship_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getStarship(id).subscribe(
                  ship => { 
                    // console.log(ship);
                    this.p_starships.push(ship.name);
                  })
              }
              info.starships = this.p_starships;
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
              for(let pilot_url of info.pilots) {
                let id = pilot_url.substr(0, pilot_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getStarship(id).subscribe(
                  pilot => { 
                    // console.log(pilot);
                    this.s_pilots.push(pilot.name);
                  })
              }
              info.pilots = this.s_pilots;
              this.s_pilots = [];
              // RESET FILMS TO SHOW A LIST OF JUST THE TITLES FOR THE STARSHIP SEARCHED
              // console.log(data.results[0]);            
              for(let film_url of info.films) {
                let id = film_url.substr(0, film_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getFilm(id).subscribe(
                  film => { 
                    // console.log(film);
                    this.s_films.push(film.title);
                  })
              }
              info.films = this.s_films;
              this.s_films = [];
            }
            this.ships = data.results;
          }
        )
      break;
      
      case 'films':
        this.dbService.search(this.searchCriteria).subscribe(
          data => { 
            for(let info of data.results) {
              this.f_characters = [];
              this.f_starships = [];
              // RESET CHARACTORS TO SHOW A LIST OF JUST THE NAMES FOR THE FILM SEARCHED
              for(let character_url of info.characters) {
                let id = character_url.substr(0, character_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getPeople(id).subscribe(
                  character => { 
                    // console.log(character);
                    this.f_characters.push(character.name);
                  })
              }
              info.characters = this.f_characters;
              
              // RESET STARSHIPS TO SHOW A LIST OF JUST THE NAMES FOR THE FILM SEARCHED
              // console.log(data.results[0]);            
              for(let ship_url of info.starships) {
                let id = ship_url.substr(0, ship_url.length-1).split('/').reverse().shift();
                // console.log(id);
                this.dbService.getStarship(id).subscribe(
                  starship => { 
                    // console.log(starship);
                    this.f_starships.push(starship.name);
                  })
              }
              info.starships = this.f_starships;
            }
            this.films = data.results;
          }
        )
      break;
    } 
    this.searchCriteria.endpoint = '';   
  }
}
