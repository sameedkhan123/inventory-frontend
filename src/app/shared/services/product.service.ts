import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  productUrl:string='https://localhost:7041/api/Product';
  productList:Product[]=[]
  productData:Product = new Product();

  private productSavedSubject = new Subject<void>();

  productSaved$ = this.productSavedSubject.asObservable();

  notifyProductSaved() {
    debugger;
    this.productSavedSubject.next();
  }
  saveProduct(){
    return this.http.post(this.productUrl,this.productData)
  }
  updateProduct(){
    return this.http.put(`${this.productUrl}/${this.productData.productId}`,this.productData)
  }
  getProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this?.productUrl);
  }
  deleteProduct(){
    
    return this.http.delete(`${this.productUrl}/${this.productData.productId}`)
  }
}
