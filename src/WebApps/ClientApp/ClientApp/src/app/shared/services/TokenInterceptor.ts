import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {AuthGuard} from '../services/auth.guard'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor {

/**
 * Creates an instance of TokenInterceptor.
 * @param {OidcSecurityService} auth
 * @memberof TokenInterceptor
 */
constructor(public auth: AuthGuard) {}

/**
 * Intercept all HTTP request to add JWT token to Headers
 * @param {HttpRequest<any>} request
 * @param {HttpHandler} next
 * @returns {Observable<HttpEvent<any>>}
 * @memberof TokenInterceptor
 */
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
       setHeaders: {
           Authorization: `Bearer ${this.auth.getToken()}`
       }
    });

    return next.handle(request);
  }
}
