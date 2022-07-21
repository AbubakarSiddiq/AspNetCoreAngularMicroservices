import { Component, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { interval } from 'rxjs'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );



  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
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
}
