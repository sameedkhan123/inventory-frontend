import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { PurchaseListingComponent } from './purchase-listing/purchase-listing.component';
import { SupplierListingComponent } from './supplier-listing/supplier-listing.component';

const routes: Routes = [
  {path:'Product',component:ProductListingComponent},
  {path:'purchase',component:PurchaseListingComponent},
  {path:'supplier',component:SupplierListingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
