import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticateInterceptor } from './interceptors/authenticate.interceptor';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginfailComponent } from './loginfail/loginfail.component';
import { AuthenticationRoutingModule } from './authn-routing.module';
import { AuthModule, LogLevel, OpenIdConfiguration, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { ConfigService } from '../core/services/config.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationPaths } from './authn-constant';
import { ConfigStore } from '../core/services/config.store';

@Injectable({ providedIn: 'root' })
export class AuthConfigService {
  getConfig(configService: ConfigService): Observable<OpenIdConfiguration> {
    //return configService.getServiceConfig()
      //.pipe(
        //map(cfg => {
          return of({
            //authority: cfg.identityUrl,
            authority: 'https://localhost:5007',
            redirectUrl: `${window.location.origin}/${AuthenticationPaths.loginCallback}`,
            postLogoutRedirectUri: `${window.location.origin}/${AuthenticationPaths.logOutCallback}`,
            //clientId: cfg.identityClientId,
            clientId: 'angular_client',
            scope: 'openid profile catalogAPI',
            responseType: 'code',
            silentRenew: true,
            silentRenewUrl: `${window.location.origin}/silent-renew.html`,
            logLevel: LogLevel.Error,
            // renew 2 minutes before token expiry.  Until we implement token delegation for eventbus.
            renewTimeBeforeTokenExpiresInSeconds: 120
          } as OpenIdConfiguration);
        //})
      //);
  }
}

export const authFactory = (authConfigService: AuthConfigService, configService: ConfigService) => {
  const config = authConfigService.getConfig(configService);
  return new StsConfigHttpLoader(config);
};

@NgModule({
  declarations: [LoginComponent, LogoutComponent, LoginfailComponent],
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: authFactory,
        deps: [AuthConfigService, ConfigService, ConfigStore]
      }
    }),
    CommonModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthnModule {
  static forRoot() {
    return {
      ngModule: AuthnModule,
      providers: [
        AuthenticationService,
        AuthenticationGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticateInterceptor, multi: true
        }
      ]
    };
  }
}
