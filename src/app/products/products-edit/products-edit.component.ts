import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product-model';
import { ProductReducerState } from '../state/product.reducer';
import { getCurrentProduct, getIsEditMode } from '../state/product.selectors';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsEditComponent implements OnInit {
  //Without NgRx Effets
  // chosenProduct?: Product;
  // isEditMode!: boolean;
  chosenProduct$!: Observable<Product | undefined>;
  isEditMode$!: Observable<boolean>;

  constructor(private store: Store<ProductReducerState>) { }

  ngOnInit(): void {
    //Without NgRx Effets
    // this.store.select(getCurrentProduct)
    //   .subscribe(
    //     currentProduct => {
    //       this.chosenProduct = currentProduct
    //     }
    //   );
    // this.store.select(getIsEditMode)
    //   .subscribe(
    //     isEditMode => {
    //       this.isEditMode = isEditMode
    //     }
    //   );

    this.chosenProduct$ = this.store.select(getCurrentProduct);

    this.isEditMode$ = this.store.select(getIsEditMode);
  }
}
