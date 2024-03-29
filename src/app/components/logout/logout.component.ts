import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router:Router,
    private logoutService:LogoutService
  ) { }

  ngOnInit() {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }

}
