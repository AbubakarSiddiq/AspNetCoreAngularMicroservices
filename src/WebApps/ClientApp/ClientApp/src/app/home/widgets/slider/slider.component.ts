import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  @Input() sliders: any[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;


  productSearch: any  
  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  searchProduct() {
    // alert("this is product: " + this.productSearch)
    // this._productService.getAll().subscribe((result) => {
    //   this.products = result.filter(a => a.name.includes(this.productSearch))
    //   this._router.navigate(['/categories'], { queryParams: { category: this.products[0].subCategories.name } });
    // })
    this._router.navigate(['/search'], { queryParams: { product: this.productSearch } });
  }
  public HomeSliderConfig: any = HomeSlider;

}
