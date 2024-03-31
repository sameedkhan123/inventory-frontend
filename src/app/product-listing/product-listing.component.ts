import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';
import { Subscription, empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnDestroy, OnInit {
  subscription: Subscription;
  constructor(private productService:ProductService,
    private modalService: NgbModal,
    public toastr:ToastrService) {
      this.subscription = this.productService.productSaved$.subscribe(() => {
        this.loadProduct();
      });
  }
  loadProduct(){
    this.productList = this.productService.productList;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  productList:Product[] = [];
  ngOnInit(): void {
    this.productService.getProduct().subscribe(res=>{this.productList=res});
  this.productService.productList;
  }
  selectedProduct:Product;
  editPrduct(selectProduct:Product)
  {
    this.selectedProduct = selectProduct;
    console.log(selectProduct);
    this.productService.productData= selectProduct;
    this.modalRef = this.modalService.open(this.addProductModal, {size:'lg',keyboard:false, centered: true });
  }
  deleteProduct(obj:Product)
  {
    if(confirm("Are you sure")){
      this.productService.productData.productId=obj.productId;
      this.productService.productData.productName=obj.productName;
      this.productService.productData.description=obj.description;
      this.productService.deleteProduct().subscribe(res=>{
        this.toastr.error("Product Deleted Sucessfully");
        this.productService.getProduct().subscribe(res=>{this.productList=res});
      },err=>{
        console.log("Something went wrong");
      });
      this.resetProductData();
    }
    
  }
  modalRef: NgbModalRef;
  @ViewChild('addProductModal') addProductModal: TemplateRef<any>;
  openAddProductModal() {
    this.selectedProduct = new Product();
    this.modalRef = this.modalService.open(this.addProductModal, { keyboard:false,centered: true });
    this.modalRef.result.then((result) => {
      // Modal is closed
      this.clearForm();
    }, (reason) => {
      // Modal is dismissed
      this.clearForm();
    });
  }
  clearForm() {
 
    if (this.modalRef.componentInstance instanceof AddProductComponent) {
      this.modalRef.componentInstance.productForm.reset(); // Reset form values
    }}
    closeModal() {
      this.loadProduct();
      this.modalRef.dismiss();
    }
    resetProductData()
    {
      this.productService.productData = new Product();
    }
}
