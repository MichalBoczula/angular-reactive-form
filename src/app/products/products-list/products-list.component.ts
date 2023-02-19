import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product-model';
import { ProductReducerState } from '../state/product.reducer';
import { getCurrentProductId, getError, getIsEditMode, getProducts, getShowProductCode } from '../state/product.selectors';
import * as ProductPageAction from '../state/actions/product-page-actions';
import * as ProductApiAction from '../state/actions/product-api-actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {

  // Without NgRx Effect
  // products!: Product[];
  // displayCode: boolean = false;
  // chosenProductId?: Number;
  // isEditMode?: Number;
  // errorMessage?: string;
  products$?: Observable<Product[]>;
  displayCode$?: Observable<boolean>;
  chosenProductId$?: Observable<Number>;
  isEditMode$?: Observable<Boolean>;
  errorMessage$?: Observable<String>;

  constructor(private store: Store<ProductReducerState>) { }

  ngOnInit(): void {
    // without NgRx Effect
    // this.store.select(getShowProductCode).subscribe(
    //   showProductCode => {
    //     this.displayCode = showProductCode
    //   }
    // );

    // this.store.select(getCurrentProductId).subscribe(
    //   productId => {
    //     this.chosenProductId = productId
    //   }
    // );

    // this.productService.getProducts().subscribe({
    //   next: products => this.products = products,
    //   error: err => this.errorMessage = err
    // });
    // this.productService.getProducts().subscribe({
    //   next: products => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.chosenProductId$ = this.store.select(getCurrentProductId);

    this.displayCode$ = this.store.select(getShowProductCode)

    this.products$ = this.store.select(getProducts);

    this.isEditMode$ = this.store.select(getIsEditMode);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductApiAction.loadProducts());
  }

  selectProduct(product: Product): void {
    let isEditMode;

    this.isEditMode$?.subscribe(x => {
      isEditMode = x
    });

    if (isEditMode) {
      alert('Brooo!!!!');
    }
    else {
      this.store.dispatch(ProductPageAction.setCurrentProductId({ productId: product.id }));
      this.store.dispatch(ProductPageAction.setCurrentProduct({ product }));
    }
  }

  addProduct(): void {
    this.store.dispatch(ProductPageAction.setIsEditModeOnTrue());
    this.store.dispatch(ProductPageAction.setCurrentProductId({ productId: 0 }));
    this.store.dispatch(ProductPageAction.initializeNewProduct());
  }

  showProductCode(): void {
    this.store.dispatch(
      ProductPageAction.toggleProductCode()
    )
  }
}
