import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationPaths, LoginActions, ReturnUrlType } from '../authn-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    const action = this.activatedRoute.snapshot.url[1];

    switch (action.path) {
      case LoginActions.loginCallback:
        const url = this.getReturnUrl();
        this.router.navigateByUrl(url, {
          replaceUrl: true
        });
        break;
      default:
        throw new Error(`Invalid action "${action}"`);
    }
  }

  private getReturnUrl(): string {
    const fromQuery = (this.activatedRoute.snapshot.queryParams as INavigationState).returnUrl;
    // If the url is coming from the query string, check that is either
    // a relative url or an absolute url
    if (fromQuery &&
      !(fromQuery.startsWith(`${window.location.origin}/`) || /^\/.*/.test(fromQuery))) {
      // This is an extra check to prevent open redirects.
      throw new Error('Invalid return url. The return url needs to have the same origin as the current page.');
    }
    return fromQuery || AuthenticationPaths.defaultLoginRedirectPath;
  }

}

interface INavigationState {
  [ReturnUrlType]: string;
}