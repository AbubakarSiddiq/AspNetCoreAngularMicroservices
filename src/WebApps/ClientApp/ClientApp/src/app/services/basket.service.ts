import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigStore } from '../core/services/config.store';
import { BasketModel } from '../models/basket-model';
import { BasketCheckoutModel } from '../models/basket-checkout-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private configStore: ConfigStore,
    private httpClient: HttpClient ) { }

  public GetBasket(userName: string): Observable<BasketModel>
  {
    return this.httpClient.get<BasketModel>(`${this.configStore.apiUrl}/Basket/${userName}`);
  }

  public UpdateBasket(model: BasketModel): Observable<BasketModel>
  {
    return this.httpClient.post<BasketModel>(`${this.configStore.apiUrl}/Basket`, model);
  }

  public CheckoutBasket(model: BasketCheckoutModel)
  {
    return this.httpClient.post<BasketCheckoutModel>(`${this.configStore.apiUrl}/Basket/Checkout`, model);
  }
}
