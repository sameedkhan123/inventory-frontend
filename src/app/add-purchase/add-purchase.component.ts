import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../shared/services/purchase.service';
import { ToastrService } from 'ngx-toastr';
import { Purchase } from '../shared/models/pruchase';
import { SupplierService } from '../shared/services/supplier.service';
import { Product } from '../shared/models/product';
import { Supplier } from '../shared/models/supplier';
import { ProductService } from '../shared/services/product.service';


@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrl: './add-purchase.component.css'
})
export class AddPurchaseComponent {
  purchaseForm: FormGroup;
  @Input() purchase: Purchase;

  constructor(private formBuilder: FormBuilder, 
    private purchaseService: PurchaseService, 
    private toastr: ToastrService,
    private supplierService:SupplierService,
    private productService:ProductService,
    ) 
  { 
    this.loadSuppliers();
    
  }
  productList:Product[]=[];
  supplierList:Supplier[]=[];
loadSuppliers(){
  this.supplierService.getSuppliers().subscribe(res=>{
    this.supplierList = res;
  });
}
loadProducts(){
  this.productService.getProduct().subscribe(res=>{
    this.productList = res;
  });
}
  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      product: ['', Validators.required],
      supplierName: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.loadProducts();
    console.log(this.productList);
    console.log(this.supplierList);
    this.loadSuppliers();
  }

  ngOnDestroy(): void {
    // Reset form values when component is destroyed
    this.purchaseForm.reset();
  }

  submitForm() {
    console.log(this,this.purchaseForm.value);
    if (this.purchaseForm.valid) {
      
        this.insertPurchase();
      
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.markFormGroupTouched(this.purchaseForm);
    }
  }
  pruchase:Purchase;
  insertPurchase() {
    debugger;
    this.purchase = new Purchase();
    this.purchase.productId = parseInt(this.purchaseForm.value.product);
    this.purchase.supplierId = parseInt(this.purchaseForm.value.supplierName);

    this.purchase.purchaseDate= new Date(this.purchaseForm.value.purchaseDate);
    this.purchase.quantity= this.purchaseForm.value.quantity;

    this.purchaseService.purchaseData=this.purchase;
    this.purchaseService.savePurchase().subscribe(res => {
      this.resetForm();
      this.toastr.success('Purchase added successfully');
      // Optionally, you can reload the list of purchases
    });
  }

  updatePurchase() {
    this.purchaseService.purchaseData = this.purchaseForm.value;
    this.purchaseService.updatePurchase().subscribe(res => {
      this.toastr.warning('Purchase updated successfully');
      // Optionally, you can reload the list of purchases
    });
    this.resetForm();
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Convenience getter for easy access to form fields
  get formControls() {
    return this.purchaseForm.controls;
  }
  resetForm() {
    this.purchaseForm.reset({
      purchaseDate: '',
      quantity: null,
      productName: null,
      supplierName: null
    });
    this.purchaseService.purchaseData = new Purchase();
    this.purchase = new Purchase();
  }
}
