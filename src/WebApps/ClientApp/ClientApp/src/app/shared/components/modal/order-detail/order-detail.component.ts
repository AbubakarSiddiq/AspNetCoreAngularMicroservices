import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, TemplateRef, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() orderId: any;
  @ViewChild("orderDetailModal", { static: false }) OrderDetailModal: TemplateRef<any>;
  IsOrderDetailShow: boolean = false
  loading: boolean = true;
  public closeResult: string;
  public modalOpen: boolean = false;
  public orderDetails: any[] = [];
  public MyOrderDetails: any[] = []
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
  }

  // async openModal() { 
   async open(orderId)   { 
    // let cartId = this.productService.GetCartId()
    // await this._productService.getAll().subscribe(response => this.products = response )
    // this.products = await this.products.filter(items => items.subCategoryId == product.subCategoryId && items.productId != product.productId )
    // const status = await this._shoppingCartService.add(product.productId, cartId)
     
    this.modalOpen = true;
      if (isPlatformBrowser(this.platformId)) { // For SSR 
        this.modalService.open(this.OrderDetailModal, { 
          size: 'lg',
          ariaLabelledBy: 'Order-Detail-Mdal',
          centered: true,
          windowClass: 'theme-modal cart-modal CartModal'
        })
        .result.then((result) => {
          `Result ${result}`
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }


    
    
    // subscribe((result) => {
    //   this.MyOrderDetails = result
    //   this.IsOrderDetailShow = true

      


    //  })


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
    }
  }

  public getProductImage = (serverPath: string) => { 
    return `/Resources/Images/${serverPath}`;
  }

}
