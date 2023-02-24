import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { CookieService }  from 'ngx-cookie-service'
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { PagesComponent } from './pages/pages.component';
import {CalendarModule} from 'primeng/calendar';
import { AuthGuard } from './shared/services/auth.guard'
import { TokenInterceptor } from './shared/services/TokenInterceptor'

import {environment} from './../environments/environment'
//import { AngularFireModule  } from '@angular/fire';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/services/config.service';
import { SharedModule } from './shared/shared.module';
import { tap } from 'rxjs/operators';
import { AuthnModule } from './authn/authn.module';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
const firebaseConfig = {  }

// import 'hammerjs';
// import 'mousetrap';

export const appInitialize = (configService: ConfigService) => {
  console.log('App Initializers: Service config.');
  return () => {
    return configService.getServiceConfig().toPromise();
  }
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

//export function configureAuth(oidcConfigService: OidcConfigService) {
  //return () =>
      //oidcConfigService.withConfig({
          //stsServer: 'https://localhost:5007',
          //redirectUrl: window.location.origin + '/signin-oidc',
          //postLogoutRedirectUri: window.location.origin,
          //clientId: 'angular_client',
          //scope: 'openid profile catalogAPI',
          //responseType: 'code',
          //silentRenew: true,
          //silentRenewUrl: `${window.location.origin}/silent-renew.html`,
          //logLevel: LogLevel.Debug,
      //});
//}

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AuthnModule.forRoot(),
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    SharedModule,
    AppRoutingModule,
    CalendarModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireAuthModule
  ],
  bootstrap: [AppComponent],
  providers: [
    //{
      //provide: APP_INITIALIZER,
      //useFactory: appInitialize,
      //deps: [ConfigService],
      //multi: true
    //},
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CookieService,
    AuthGuard
  ]
})
export class AppModule { }
