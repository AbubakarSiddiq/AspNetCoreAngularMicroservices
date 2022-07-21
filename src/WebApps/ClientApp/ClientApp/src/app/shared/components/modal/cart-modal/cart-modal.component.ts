import { Component, OnDestroy, ViewChild, TemplateRef, Input,
  PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CatalogModel } from 'src/app/models/catalog-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnDestroy {

  @Input() product: CatalogModel;
  @Input() currency : any;
  
  @ViewChild("cartModal", { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;
  private cartSubscription: Subscription;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private cartService: CartService) {
      this.cartSubscription = new Subscription();
  }

  openModal(product: CatalogModel) {
    this.cartService.AddToCart(product.id, 'swn', 1);
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.CartModal, { 
        size: 'lg',
        ariaLabelledBy: 'Cart-Modal',
        centered: true,
        windowClass: 'theme-modal cart-modal CartModal'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
      this.cartSubscription.unsubscribe();
    }
  }
}
