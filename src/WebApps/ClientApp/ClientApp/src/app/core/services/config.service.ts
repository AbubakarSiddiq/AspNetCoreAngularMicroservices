import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ServiceConfig } from './service-config';
import { ConfigStore } from './config.store';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected defaultHttpOptions: RequestInit = { headers: { 'Content-Type': 'application/json' } };

  constructor(private configStore: ConfigStore) { }

  /**
   * Get the service config from server and save to config store.
   */
  public getServiceConfig(): Observable<ConfigStore> {
    if (this.configStore.apiUrl) {
      return of(this.configStore);
    }

    return from(fetch('api/config', this.defaultHttpOptions))
      .pipe(
        switchMap(response => response.json() as Promise<ServiceConfig>),
        tap(config => this.configStore.load(config)),
        map(() => this.configStore)
      );
  }
}
