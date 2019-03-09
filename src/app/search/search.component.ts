import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchCriteria = {}
  constructor(private dbService: DataService) { }

  ngOnInit() {
  }

  searchSubmit() {
    //console.log(this.searchCriteria)
    this.dbService.search(this.searchCriteria)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
}
