import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigStore } from '../core/services/config.store';
import { OrderResponseModel } from '../models/order-response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private configStore: ConfigStore) { }
  
    public GetOrdersByUserName(userName: string): Observable<OrderResponseModel[]>
    {
      return this.httpClient.get<OrderResponseModel[]>(`http://localhost:8010/}/Order/${userName}`)
      //return this.httpClient.get<OrderResponseModel[]>(`${this.configStore.apiUrl}/Order/${userName}`)
    }
}
