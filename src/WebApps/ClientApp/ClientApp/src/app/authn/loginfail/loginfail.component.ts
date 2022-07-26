import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LogoutActions } from '../authn-constant';

@Component({
  selector: 'app-loginfail',
  templateUrl: './loginfail.component.html',
  styleUrls: ['./loginfail.component.scss']
})
export class LoginfailComponent implements AfterViewInit {

  public message = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngAfterViewInit() {
    const signoutFromApp = history.state?.signoutFromApp;
    const action = this.activatedRoute.snapshot.url[0];
    this.message = 'error message';

    if (action.path === LogoutActions.loginfailCallback) {
        if (!signoutFromApp) {
          this.signOut();
        }
      } else {
        throw new Error(`Invalid action "${action.path}"`);
    }
    history.replaceState(null, 'state');
  }
  signOut() {
    this.authenticationService.signOut();
  }
}
