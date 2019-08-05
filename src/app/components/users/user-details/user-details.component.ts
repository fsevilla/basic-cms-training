import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId:number;
  user:any = {};

  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    private activatedRoute:ActivatedRoute,
    private userService:UserService
  ) {
    // this.activatedRoute.parent.params.subscribe(params => {
    //   console.log('Parent params', params);
    //   this.userId = params.userId;
    // });

    this.activatedRoute.params.subscribe(params => {
      console.log('Component params', params);
      this.userId = params.userId;
    });

    // this.activatedRoute.firstChild.params.subscribe(params => {
    //   console.log('Child params: ', params);
    //   this.userId = params.userId;
    // });
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserDetails(this.userId)
      .then(response => {
        this.user = response;
        console.log('User details: ', this.user);
      })
      .catch(err => {
        console.error('Failed to load user:', err);
      });
  }

  saveUpdates() {
    console.log('Changes saved!');
    // trigger onUpdate event
    this.onUpdate.emit({
      success: true,
      user: this.user
    });
  }

}
