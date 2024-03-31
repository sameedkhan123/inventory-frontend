import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseListingComponent } from './purchase-listing/purchase-listing.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { SupplierListingComponent } from './supplier-listing/supplier-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    AddProductComponent,
    PurchaseListingComponent,
    AddPurchaseComponent,
    AddSupplierComponent,
    SupplierListingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
