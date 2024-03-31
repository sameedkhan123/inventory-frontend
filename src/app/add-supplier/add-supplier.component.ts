import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../shared/services/supplier.service';
import { Supplier } from '../shared/models/supplier';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {
  supplierForm: FormGroup;
  @Input() supplier:Supplier;

  constructor(private fb: FormBuilder, private supplierService: SupplierService,
    private toastr:ToastrService) {
    
  }
  ngOnInit(): void {
    
    this.supplierForm = this.fb.group({
      name: [this.supplier.name ? this.supplier.name : '', [Validators.required]],
      address: [this.supplier.address?this.supplier.address:'', [Validators.required]]
    });
}

  // createForm(): void {
  //   this.supplierForm = this.fb.group({
  //     name: [ '', [Validators.required]],
  //     address: [, [Validators.required]]
  //   });
  // }

  get name() {
    return this.supplierForm.get('name');
  }

  get address() {
    return this.supplierForm.get('address');
  }

  submitForm(): void {
    if (this.supplierForm.valid) {
      debugger;
      if(this.supplier.supplierId)
      {
        this.updateSupplier();
      }
      else {
        const supplier = this.supplierForm.value;
        this.supplierService.supplierData = supplier;
        this.supplierService.saveSupplier().subscribe(() => {
          // Clear form after successful submission
          this.clearForm();
        });
      }
     
    } else {
      // Mark form controls as touched to trigger validation messages
      this.supplierForm.markAllAsTouched();
    }
  }
  updateSupplier(){
    this.supplierService.supplierData= this.supplierForm.value;
    this.supplierService.supplierData.supplierId= this.supplier.supplierId;
    console.log("product in component",this.supplierService.supplierData)
        this.supplierService.updateSupplier().subscribe(res=>{
         this.toastr.warning("Sucess","Product updated Sucessfully");
         this.loadSupplier();
        });
        this.clearForm();
        
  }
  loadSupplier(): void {
    this.supplierService.getSuppliers().subscribe(res=>{this.supplierService.supplierList=res});
  }
  
  clearForm(): void {
    this.supplierForm.reset();
    this.supplierService.supplierData = new Supplier();
  }
}
