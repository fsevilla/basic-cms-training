import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  demo:string;

  constructor(
    private homeService: HomeService
  ) { 
    this.demo = 'here!';
  }

  ngOnInit() {
    this.homeService.getContent()
      .then(response => {
        console.log('Content: ', response);
      })
      .catch(err => {
        console.error('Failed to load content', err);
      });
  }

}
