import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { VegetableComponent } from './vegetable/vegetable.component';
 

const routes: Routes = [ 
  { 
    //  vegetable
    path: '',
    component: VegetableComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
