import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productName: string;
  description: string;
  unitPrice: number;
  quantity: number;
  productForm: FormGroup;
  @Input() product:Product;

  constructor(private formBuilder: FormBuilder,private productService:ProductService,public toastr:ToastrService) { }

  ngOnInit(): void {

      this.productForm = this.formBuilder.group({
        productName: [this.product.productName ? this.product.productName : '', Validators.required],
        description: [this.product.description ? this.product.description : ''],
      });
  }

  ngOnDestroy(): void {
    // Reset form values when component is destroyed
    this.productForm.reset();
  
  }
  resetForm() {
    this.productForm.reset({
      productName: '', 
      description: '', 
    });
    this.productService.productData = new Product();
    this.product = new Product();
  }
  
  onSubmit() {

    console.log("product",this.product)
    //if (this.productForm.valid) {
      debugger;
      if(this.product.productId)
      {
        this.updateProduct();
        
      }
      else{
        this.insertProduct();
      }
      // Form is valid, proceed with form submission
      console.log('Form submitted:', this.productForm.value);
    // } else {
    //   // Form is invalid, display error messages
    //   console.log('Form is invalid');
    // }
  }
  insertProduct(){
    this.productService.productData=this.productForm.value;
    this.productService.saveProduct().subscribe(res=>{
      this.resetForm();
      this.toastr.success("Sucess","Product added sucessfully");
      this.loadProduct();
    });
  }
  updateProduct(){
    this.productService.productData= this.productForm.value;
    this.productService.productData.productId= this.product.productId;
    console.log("product in component",this.productService.productData)
        this.productService.updateProduct().subscribe(res=>{
         this.toastr.warning("Sucess","Product updated Sucessfully");
         this.loadProduct();
        });
        this.resetForm();
        
  }
  loadProduct(){
    this.productService.getProduct().subscribe(res=>{this.productService.productList=res;});
  }
}
