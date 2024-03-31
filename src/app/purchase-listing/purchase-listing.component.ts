import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PurchaseService } from '../shared/services/purchase.service';
import { Product } from '../shared/models/product';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddPurchaseComponent } from '../add-purchase/add-purchase.component';
import { Purchase } from '../shared/models/pruchase';
import { PurchaseWithNamesDto } from '../shared/models/PurchaseWithNamesDto';

@Component({
  selector: 'app-purchase-listing',
  templateUrl: './purchase-listing.component.html',
  styleUrl: './purchase-listing.component.css'
})
export class PurchaseListingComponent {
  subscription: Subscription;
  purchaseList: Purchase[] = [];
  selectedPurchase: Product;

  constructor(
    private purchaseService: PurchaseService,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {
    this.subscription = this.purchaseService.purchaseSaved$.subscribe(() => {
      this.loadPurchases();
    });
  }

  ngOnInit(): void {
    this.loadPurchases();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  purchaseListDto:PurchaseWithNamesDto[]=[];
  loadPurchases(): void {
    this.purchaseService.getPurchase().subscribe(res => {
      this.purchaseListDto = res;
    });
  }

  // editPurchase(selectedPurchase: Product): void {
  //   this.selectedPurchase = selectedPurchase;
  //   this.purchaseService.purchaseData = selectedPurchase;
  //   this.modalRef = this.modalService.open(this.addPrurchaseModal, { centered: true });
  //   this.modalRef.result.then((result) => {
  //     this.clearForm();
  //   }, (reason) => {
  //     this.clearForm();
  //   });
  // }

  deletePurchase(purchase: PurchaseWithNamesDto): void {
    if (confirm("Are you sure?")) {
      this.purchaseService.purchaseDto = purchase;
      this.purchaseService.deletePurchase().subscribe(res => {
        this.toastr.error("Sucess","Purchase Deleted Successfully");
        this.loadPurchases();
      }, err => {
        console.log("Something went wrong");
      });
      this.resetPurchaseData();
    }
  }

  modalRef: NgbModalRef;
  @ViewChild('addPrurchaseModal') addPrurchaseModal: TemplateRef<any>;

  openPurchaseModal(): void {
    this.selectedPurchase = new Product();
    this.modalRef = this.modalService.open(this.addPrurchaseModal, { centered: true });
    this.modalRef.result.then((result) => {
      this.clearForm();
    }, (reason) => {
      this.clearForm();
    });
  }

  clearForm(): void {
    if (this.modalRef.componentInstance instanceof AddPurchaseComponent) {
      //this.modalRef.componentInstance.productForm.reset();
    }
  }

  closeModal(): void {
    this.purchaseService.notifyPurchaseSaved();
    this.modalRef.dismiss();
  }

  resetPurchaseData(): void {
    this.purchaseService.purchaseData = new Purchase();
    this.purchaseService.purchaseDto = new PurchaseWithNamesDto();
  }
}
