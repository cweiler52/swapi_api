import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { People } from '../models/people.model';
import { Films } from '../models/films.model';
import { Starships } from '../models/starships.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private swapiBaseUrl      = 'https://swapi.co/api';
  private swapiPeopleUrl    = 'https://swapi.co/api/people/';
  private swapiFilmsUrl     = 'https://swapi.co/api/films/';
  private swapiStarshipsUrl = 'https://swapi.co/api/starships/';

  constructor(private http: HttpClient) { }

  search(searchCriteria): Observable<any>  {
    let fetchUrl = this.swapiBaseUrl+'/'+searchCriteria.endpoint+'/?search='+searchCriteria.q;
    return this.http.get<any>(fetchUrl, httpOptions);
  }


  getPeople(): Observable<People[]> {
    return this.http.get<People[]>(this.swapiPeopleUrl, httpOptions)
  }
  
  getFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(this.swapiFilmsUrl, httpOptions)
  }  
  
  getStarships(): Observable<Starships[]> {
    return this.http.get<Starships[]>(this.swapiStarshipsUrl, httpOptions)
  }
}
