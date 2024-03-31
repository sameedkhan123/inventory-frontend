import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { Supplier } from '../shared/models/supplier';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from '../shared/services/supplier.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplier-listing',
  templateUrl: './supplier-listing.component.html',
  styleUrl: './supplier-listing.component.css'
})
export class SupplierListingComponent {
  subscription: Subscription;
  supplierList: Supplier[] = []; 


  constructor(private supplierService: SupplierService, 
    private modalService: NgbModal,
    public toastr: ToastrService) {
    this.subscription = this.supplierService.supplierSaved$.subscribe(() => {
      this.loadSupplier();
    });
  }

  loadSupplier(): void {
    this.supplierService.getSuppliers().subscribe(res=>{this.supplierService.supplierList=res});
    this.supplierList = this.supplierService.supplierList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(res => { 
      this.supplierList = res; 
    });
  }

  selectedSupplier: Supplier;
  editSupplier(selectSupplier: Supplier): void { 
    this.selectedSupplier = selectSupplier;
    console.log(selectSupplier);
    this.supplierService.supplierData = selectSupplier;
    this.modalRef = this.modalService.open(this.addSupplierModal, {size:'lg', keyboard:false, centered: true });
    this.modalRef.result.then((result) => {
      this.clearForm();
    }, (reason) => {
      this.clearForm();
    });
  }

  deleteSupplier(obj: Supplier): void { 
    if (confirm("Are you sure")) {
      this.supplierService.supplierData.supplierId = obj.supplierId; 
      this.supplierService.supplierData.name = obj.name; 
      this.supplierService.supplierData.address = obj.address; 
      this.supplierService.deleteSupplier().subscribe(res => {
        this.toastr.error("Supplier Deleted Successfully");
        this.supplierService.getSuppliers().subscribe(res => { this.supplierList = res; });
      }, err => {
        console.log("Something went wrong");
      });
      this.resetSupplierData();
    }
  }

  modalRef: NgbModalRef;
  @ViewChild('addSupplierModal') addSupplierModal: TemplateRef<any>;

  openAddSupplierModal(): void {
    this.selectedSupplier = new Supplier();
    this.modalRef = this.modalService.open(this.addSupplierModal, { centered: true });
    this.modalRef.result.then((result) => {
      // Modal is closed
      this.clearForm();
    }, (reason) => {
      // Modal is dismissed
      this.clearForm();
    });
  }

  clearForm(): void {
    
    if (this.modalRef.componentInstance instanceof AddSupplierComponent) {
      this.modalRef.componentInstance.supplierForm.reset(); // Reset form values
    }
  }

  closeModal(): void {
    this.supplierService.notifySupplierSaved();
    // Close the modal
    this.modalRef.dismiss();
  }

  resetSupplierData(): void {
    this.supplierService.supplierData = new Supplier();
  }
}
