import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../../services/product.service";
import { CartService } from 'src/app/services/cart.service';
import { BasketService } from 'src/app/services/basket.service';
import { BasketModel } from 'src/app/models/basket-model';

@Component({
  selector: 'app-cart-variation',
  templateUrl: './cart-variation.component.html',
  styleUrls: ['./cart-variation.component.scss'] 
})
export class CartVariationComponent implements OnInit, OnDestroy {

  @Input() direction: string = 'right'; // Default Direction Right

  public products: any[] = [];
  public cartItem: BasketModel;

  constructor(
    public cartService: CartService,
    private basketService: BasketService,
    public productService: ProductService) {
  }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(() => {this.getAll()});
  }
  getAll() {
    this.basketService.GetBasket('swn')
    .subscribe((result) => {
      this.cartItem = result;
    });
  }

  closeCart() {
    this.cartService.OpenCart = false;
  }

  // Increament
  increment(product, qty = 1) {
    this.cartService.AddToCart(product.productId, 'swn', qty)
    this.cartService.cartChanged.subscribe(() => {this.getAll()});
  }

  // Decrement
  decrement(product, qty = -1) {
    if (product.quantity <= 1){
      this.removeItem(product);
    }
    else {
      this.cartService.AddToCart(product.productId, 'swn', qty)
      this.cartService.cartChanged.subscribe(() => {this.getAll()});
    }
  }

  public removeItem(product: any) {
    var index = this.cartItem.items.findIndex(i => i.productId == product.productId);
    if (index > -1)
    {
      this.cartItem.items.splice(index, 1);
    }
    this.cartService.RemoveToCart(product.productId, 'swn');
    this.cartService.cartChanged.subscribe(() => {this.getAll()});
  }

  ngOnDestroy(): void {
    this.closeCart();
  }

}
