import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

// Pages Components
import { WishlistComponent } from './account/wishlist/wishlist.component';
import { CartComponent } from './account/cart/cart.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ContactComponent } from './account/contact/contact.component';
import { CheckoutComponent } from './account/checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CompareOneComponent } from './compare/compare-one/compare-one.component';
import { CompareTwoComponent } from './compare/compare-two/compare-two.component';
import { CollectionComponent } from './collection/collection.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FaqComponent } from './faq/faq.component';
// Portfolio Components
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { UpdatePasswordComponent } from './account/update-password/update-password.component';
import { PhoneVerficationComponent } from './account/phone-verfication/phone-verfication.component';

@NgModule({
  declarations: [
    WishlistComponent,
    CartComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    ContactComponent,
    CheckoutComponent,
    AboutUsComponent,
    SearchComponent,
    OrderSuccessComponent,
    CompareOneComponent,
    CompareTwoComponent,
    CollectionComponent,
    ComingSoonComponent,
    FaqComponent,
    UpdatePasswordComponent,
    PhoneVerficationComponent
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    NgxSpinnerModule 
  ]
})
export class PagesModule { }
