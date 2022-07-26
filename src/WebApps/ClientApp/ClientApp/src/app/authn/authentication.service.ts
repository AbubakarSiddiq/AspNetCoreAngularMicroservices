import { Injectable } from '@angular/core';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { filter, map, take, switchMap, tap } from 'rxjs/operators';
import { UserData } from './models/user-data';
import { Login } from './models/login';

@Injectable()
export class AuthenticationService {

  constructor(private oidcSecurityService: OidcSecurityService,
    private publicEventsService: PublicEventsService ){}

  get isAuthenticated() {
    return this.oidcSecurityService.isAuthenticated$
      .pipe(map(res => res.isAuthenticated));
  }

  get user() {
    return this.oidcSecurityService.userData$
      .pipe(
        map(res => {
          return res.userData ? {
            userId: res.userData.sub,
            username: res.userData.name
          } as UserData : null;
        })
      );
  }

  get accessToken() {
    return this.oidcSecurityService.getAccessToken();
  }

  initialize() {
    // use events to listen for when oidc config has loaded, before doing a checkAuth().
    return this.publicEventsService.registerForEvents()
      .pipe(
        filter((notification) => notification.type === EventTypes.ConfigLoaded),
        take(1),
        switchMap(() => this.oidcSecurityService.checkAuth()),
        map(response => this.getLogin(response))
      );
  }

  signIn() {
    // authorize() method is void, so return an observable that tells system when signIn has completed.
    const signIn = this.publicEventsService.registerForEvents()
      .pipe(
        filter(notification => notification.type === EventTypes.NewAuthenticationResult),
        take(1),
        map(() => true)
      );
    this.oidcSecurityService.authorize();
    return signIn;
  }

  refresh() {
    const refresh = this.publicEventsService.registerForEvents()
      .pipe(
        filter(notification => notification.type === EventTypes.NewAuthenticationResult),
        take(1),
        map(() => true)
      );

    this.oidcSecurityService.logoff();
    this.oidcSecurityService.authorize();

    return refresh;
  }

  signOut() {
    this.oidcSecurityService.logoff();
  }

  private getLogin(login: any) {
    const res = {
      isAuthenticated: login?.isAuthenticated
    } as Login;

    if (res.isAuthenticated) {
      res.userData = {
        userId: login.userData.sub,
        username: login.userData.username,
        setupPending: login.userData.setupPending
      };
    }

    return res;
  }
}
