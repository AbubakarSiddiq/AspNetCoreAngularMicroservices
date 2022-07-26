import { Component, Injectable, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { interval } from 'rxjs'; 
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthenticationService } from './authn/authentication.service';
import { EMPTY, forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
  public oidcSecurityService: OidcSecurityService,
  public authenticationService: AuthenticationService,
    private loader: LoadingBarService, translate: TranslateService) {
    // if (isPlatformBrowser(this.platformId)) {
    //   translate.setDefaultLang('en');
    //   translate.addLangs(['en', 'fr']);
    // }

    var hours = 8;
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null)
    {
      localStorage.setItem('setupTime', now.toString())
      window.location.reload()
    }
    else
    {
      let saved = localStorage.getItem('setupTime')
      if (saved && (new Date().getTime() - parseInt(saved) > hours * 60 * 60 * 1000 ))
      {
        localStorage.removeItem('setupTime')
      }      
    }
  } 

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth()
    .subscribe((isAuthenticated) => 
    {
      console.log('app authenticated', isAuthenticated);
      this.testlogin();

    });
  }

  testlogin() {
    const loginfail = catchError((error: any) => {
      console.log('App Initializers: failed during initialization.');
      console.log(error);
      this.router.navigate(['signout'], { state: { signoutFromApp: true } });
      return of({});
    });
   return () => this.authenticationService.initialize()
    .pipe(
      switchMap(login => {
        if (!login.isAuthenticated) {
          console.log('App Initializers: Authentication signing in.');
          return this.authenticationService.signIn();
         }
        else if (login.userData.setupPending) {
          this.router.navigate(['registration', 'setup-user', login.userData.userId], {
            replaceUrl: true
          });
          return EMPTY;
        }
        console.log('App Initializers: Authentication already signed in.');
        return of({});
      }),
      //switchMap(() => {
        //console.log('App Initializers: Service config.');

        //return this.configService.getServiceConfig();
      //}),
      tap(() => {
        console.log('App Initializers: system service, theme service.');
      }),
      //switchMap(() => {
        //console.log('App Initializers: Resource access service, Feature flag service, User Info Service.');
      //}),

      tap(() => {
        console.log('App Initializers: Starting user inactivity timer.');
        //userIdleService.start(userInactivityTimeout)
          //.pipe(tap(() => authenticationService.signOut()))
          //.subscribe();
      }),
      tap(() => console.log('App Initializers: Completed all initializers.')),
      loginfail
    );
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
