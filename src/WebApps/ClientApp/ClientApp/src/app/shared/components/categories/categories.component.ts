import { Component, OnInit } from '@angular/core';
// import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: any[] = [];
  public collapse: boolean = true;
  // public filterbyCategory: SubCategory[] = []
  public filterbyCategory: any[] = []
  constructor(
    public productService: ProductService,


    ) { 
      this.filterbyCategoryFunc() 
    // this.productService.getProducts.subscribe(product => this.products = product);
    // this._productService.getAll().subscribe(product => this.products = product)
  }

  filterbyCategoryFunc() {
    // const category = [...new Set(this.products.map(product => product.type))]
   //  const category = [...new Set(this.products.map(product => product.subCategories?.name))]
  //  this._subCategoryService.getAll().subscribe((result) => {
  //    this.filterbyCategory = result.filter(a => a.isActive == true)
  //  }) 

  }


  ngOnInit(): void {
  }

  // get filterbyCategory() {
  //   debugger
  //   // const category = [...new Set(this.products.map(product => product.type))]
  //   const category = [...new Set(this.products.map(product => product.subCategories?.name))]
  //   return category
  // }

}
