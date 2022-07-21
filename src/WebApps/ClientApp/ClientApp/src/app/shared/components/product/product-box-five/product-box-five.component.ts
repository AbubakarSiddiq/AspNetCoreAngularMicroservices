import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { ProductService } from "../../../services/product.service";
import { CookieService } from 'ngx-cookie-service';
import { CatalogModel } from 'src/app/models/catalog-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-box-five',
  templateUrl: './product-box-five.component.html',
  styleUrls: ['./product-box-five.component.scss']
})
export class ProductBoxFiveComponent {


  @Input() product: CatalogModel;
  @Input() currency: any; 
  @Input() thumbnail: boolean = true; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  cookieDate: Date

  constructor(
    private productService: ProductService,
    public _cookieService: CookieService,
    private cartService: CartService,
    ) {  }

  addToCart(product: CatalogModel) {
    this.cartService.AddToCart(product.id, 'swn', 1);
  }
}
