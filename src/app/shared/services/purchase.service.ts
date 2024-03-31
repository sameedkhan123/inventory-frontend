import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
import { Purchase } from '../models/pruchase';
import { PurchaseWithNamesDto } from '../models/PurchaseWithNamesDto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  purchaseUrl: string = 'https://localhost:7041/api/Purchase';
  purchaseList: PurchaseWithNamesDto[] = [];
  purchaseData: Purchase = new Purchase();
  purchaseDto:PurchaseWithNamesDto = new PurchaseWithNamesDto();

  private purchaseSavedSubject = new Subject<void>();

  purchaseSaved$ = this.purchaseSavedSubject.asObservable();

  notifyPurchaseSaved() {
    this.purchaseSavedSubject.next();
  }

  savePurchase() {
    return this.http.post(this.purchaseUrl, this.purchaseData);
  }

  updatePurchase() {
    return this.http.put(`${this.purchaseUrl}/${this.purchaseData.purchaseId}`, this.purchaseData);
  }

  getPurchase(): Observable<PurchaseWithNamesDto[]> {
    return this.http.get<PurchaseWithNamesDto[]>(this.purchaseUrl);
  }

  deletePurchase() {
    return this.http.delete(`${this.purchaseUrl}/${this.purchaseDto.purchaseId}`);
  }
}
