import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigStore } from '../core/services/config.store';
import { CatalogModel } from '../models/catalog-model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private configStore: ConfigStore,
    private httpClient: HttpClient) { }

  public GetCatalog(): Observable<CatalogModel[]> 
  {
    debugger;
    var abc = this.httpClient.get<CatalogModel[]>(`http://localhost:8010/catalog`);
    //console.log(${this.configStore.apiUrl});
    console.log('this. ');
    console.log(abc);
    return abc;
  }

  public GetCatalogById(id: string): Observable<CatalogModel>
  {
    return this.httpClient.get<CatalogModel>(`${this.configStore.apiUrl}/Catalog/${id}`);
  }

  public GetCatalogByCategory(category: string): Observable<CatalogModel[]>
  {
      return this.httpClient.get<CatalogModel[]>(`${this.configStore.apiUrl}/Catalog/GetProductByCategory/${category}`);
  }

  public CreateCatalog(model: CatalogModel): Observable<CatalogModel>
  {
    return this.httpClient.post<CatalogModel>(`${this.configStore.apiUrl}/Catalog`, model);
  }  
}
