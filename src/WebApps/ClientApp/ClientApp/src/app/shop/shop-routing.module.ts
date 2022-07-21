import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './checkout/success/success.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    //  collection/left/sidebar
    path: 'categories',
    component: CollectionLeftSidebarComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    //canActivate: [AuthGuard]
    // data: {
    //   roles: ['Customer']
    // }
  },
  {
    //path: 'checkout/success/:id',
    path: 'checkout/success',
    component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
