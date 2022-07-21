import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { BasketService } from './basket.service';
import { CatalogService } from './catalog.service';
import { BasketItemModel } from '../models/basket-item-model';
import { BasketModel } from '../models/basket-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public OpenCart = false;
  private cartSubject = new BehaviorSubject<BasketModel>({} as BasketModel);

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    private router: Router) { }

    public AddToCart(productId: string, userName: string, counter: number): Observable<boolean> {
      forkJoin(
        this.catalogService.GetCatalogById(productId),
        this.basketService.GetBasket(userName)
      ).subscribe((result) => {

        const product = result[0];
        const basket = result[1];

        if (basket.items.length > 0 && basket.items.find(p => p.productId === productId)){
          basket.items.forEach(p => {
            if (p.productId === productId){
              p.price = product.price;
              if (counter > 0){
                p.quantity++;
              }else {
                p.quantity--;
              }
            }          
          });
        }
        else {
          basket.items.push(
            {
              productId: productId,
              productName: product.name,
              price: product.price,
              quantity: counter || 1,
              color: ''
            } as BasketItemModel
          )
        }

        this.basketService.UpdateBasket(basket).subscribe((response) => {
          if (response){
            this.OpenCart = true;  
            this.cartSubject.next(response);
            return EMPTY;
          }
        });
      });
      return EMPTY;
    }

    get cartChanged() {
      return this.cartSubject.asObservable();
    }

    public RemoveToCart(productId: string, userName: string): Observable<BasketModel>{
      this.basketService.GetBasket(userName)
      .subscribe((basket) => {
        var index = basket.items.findIndex(i => i.productId == productId);
        if (index > -1)
        {
          basket.items.splice(index, 1);
          this.basketService.UpdateBasket(basket)
            .subscribe((result) => {
              this.cartSubject.next(result);
                return EMPTY;
            });
        }
      });
      return EMPTY;
    }
}
