import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { BasketModel } from 'src/app/models/basket-model';
import { CartService } from 'src/app/services/cart.service';
import { CatalogModel } from 'src/app/models/catalog-model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public cartItem: BasketModel;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private basketService: BasketService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.basketService.GetBasket('swn')
    .subscribe((result) => {
      this.cartItem = result;
    });
  }

  ngAfterContentChecked(): void {  
    //this.getAll();
  }

  public removeItem(product: CatalogModel) {
    this.cartService.RemoveToCart(product.id, 'swn');
  }
}
