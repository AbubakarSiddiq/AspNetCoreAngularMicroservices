import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { PagesComponent } from './pages/pages.component';
import { VegetableComponent } from './home/vegetable/vegetable.component';

const routes: Routes = [
  // {
  //   //  home/vegetable
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full' 
  // },
  {
    path: '',
    component: VegetableComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    //  shop
    path: '',
    component: ShopComponent,
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  { 
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) 
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //initialNavigation: 'enabled',
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
