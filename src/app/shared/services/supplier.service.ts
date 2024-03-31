// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SupplierService {

//   constructor() { }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'https://localhost:7041/api/Supplier';
  supplierList: Supplier[] = [];
  supplierData: Supplier = new Supplier();

  private supplierSavedSubject = new Subject<void>();

  supplierSaved$ = this.supplierSavedSubject.asObservable();

  constructor(private http: HttpClient) { }

  notifySupplierSaved() {
    this.supplierSavedSubject.next();
  }

  saveSupplier(): Observable<any> {
    debugger;
    return this.http.post(this.apiUrl, this.supplierData);
  }

  updateSupplier(): Observable<any> {
    const url = `${this.apiUrl}/${this.supplierData.supplierId}`;
    return this.http.put(url, this.supplierData);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  deleteSupplier(): Observable<any> {
    const url = `${this.apiUrl}/${this.supplierData.supplierId}`;
    return this.http.delete(url);
  }
}
