import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product-model';
import { ProductReducerState } from '../../state/product.reducer';
import { getCurrentProduct, getIsEditMode } from '../../state/product.selectors';
import * as ProductPageAction from './../../state/actions/product-page-actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsAddComponent {
  // Without NgRx Effects
  // chosenProduct?: Product;
  // isEditMode!: boolean;
  chosenProduct$?: Observable<Product | undefined>;
  isEditMode$!: Observable<boolean>;

  constructor(private store: Store<ProductReducerState>) { }

  ngOnInit(): void {
    // Without NgRx Effects
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

  cancelEditMode(): void {
    this.store.dispatch(ProductPageAction.setIsEditModeOnFalse());
    this.store.dispatch(ProductPageAction.clearCurrentProduct());
  }
}
