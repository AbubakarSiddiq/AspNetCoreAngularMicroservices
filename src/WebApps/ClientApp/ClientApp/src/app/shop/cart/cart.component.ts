import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { BasketModel } from 'src/app/models/basket-model';
import { CartService } from 'src/app/services/cart.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItem: BasketModel;
  private cartSubscription: Subscription;

  constructor(
    public cartService: CartService,
    private basketService: BasketService, 
    private viewScroller: ViewportScroller) {
      this.cartSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.cartService.OpenCart = false;
    this.getAll()
  }
  getAll() {
    this.basketService.GetBasket('swn')
    .subscribe((result) => {
      this.cartItem = result;
    });
  }

  // Increament
  increment(product, qty = 1) {
    this.cartService.AddToCart(product.productId, 'swn', qty).subscribe();
    this.cartSubscription = this.cartService.cartChanged.subscribe(() => {this.getAll()});
  }

  // Decrement
  decrement(product, qty = -1) {
    if (product.quantity <= 1){
      this.removeItem(product);
    }
    else {
      this.cartService.AddToCart(product.productId, 'swn', qty).subscribe();
      this.cartSubscription = this.cartService.cartChanged.subscribe(() => {this.getAll()});
    }
  }

  public removeItem(product: any) {
    this.cartService.RemoveToCart(product.productId, 'swn').subscribe();
    this.cartSubscription = this.cartService.cartChanged.subscribe(() => {this.getAll()});
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
