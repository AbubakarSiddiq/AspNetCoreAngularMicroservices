import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

import { QueryParameterNames, AuthenticationPaths } from '../authn-constant';


@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }
  
    canActivate(
      _: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      return this.authenticationService.isAuthenticated.pipe(tap(res => this.handleAuthorization(res, state)));
    }
  
    canActivateChild(
      _: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      return this.authenticationService
      .isAuthenticated.pipe(
        tap(res => this.handleAuthorization(res, state)));
    }
  
    private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
      if (isAuthenticated) {
        return true;
      }
  
      this.router.navigate(AuthenticationPaths.loginPathComponents, {
        queryParams: {
          [QueryParameterNames.returnUrl]: state.url
        }
      });
  
      return false;
    }
}