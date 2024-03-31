import { Product } from "./product";
import { Supplier } from "./supplier";

export class Purchase {
    purchaseId: number;
    purchaseDate: Date;
    quantity: number;
    productId: number;
    supplierId: number;
  }