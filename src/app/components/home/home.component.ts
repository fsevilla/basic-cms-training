import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user:any = {};
  error:boolean;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.homeService.getContent()
      .then(response => {
        this.user = response;
        this.error = false;
      })
      .catch(err => {
        this.error = true;
      });
  }

}
