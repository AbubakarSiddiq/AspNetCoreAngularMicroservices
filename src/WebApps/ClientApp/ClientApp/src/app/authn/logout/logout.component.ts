import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogoutActions } from '../authn-constant';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  public message = '';

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const action = this.activatedRoute.snapshot.url[1];
    switch (action.path) {
      case LogoutActions.logoutCallback:
        this.message = 'You have logged out.';
        break;
      default:
        throw new Error(`Invalid action "${action.path}"`);
    }
  }
}
