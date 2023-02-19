import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Product } from '../product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private products: Product[] = [];
  private productUrl: string = 'http://localhost:4201/api/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // if (!!this.products.length) {
    //   return of(this.products);
    // }
    // else {
    return this.httpClient.get<Product[]>(this.productUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        // tap(data => this.products = data),
        catchError(x => throwError(x.message))
      )
    // }
  }

  updateProduct(): Observable<Number> {
    throw new Error("Method not implemented.");
  }
}
