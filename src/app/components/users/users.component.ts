import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  users:any;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .then(response => {
        console.log('Users: ', response);
        this.users = response;
      })
      .catch(err => {
        console.error('Failed to retrieve users', err);
      });
  }

  editUser(user:any) {
    console.log('Will edit user: ', user);
  }

}
