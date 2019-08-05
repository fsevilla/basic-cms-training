import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from './../user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./../users.component.scss', './users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  users:any;
  isLoading:boolean;
  @Output() onUserSelected = new EventEmitter<any>();

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers()
      .then(response => {
        console.log('Users: ', response);
        this.users = response;
        this.isLoading = false;
      })
      .catch(err => {
        console.error('Failed to retrieve users', err);
        this.isLoading = false;
      });
  }

  editUser(user:any) {
    console.log('Will edit user: ', user);
  }

  selectUser(user:any) {
    this.onUserSelected.emit(user); // Note: this cannot be caught by a router-outlet. Users component html needs to inject users list as HTML element. 
  }
}
