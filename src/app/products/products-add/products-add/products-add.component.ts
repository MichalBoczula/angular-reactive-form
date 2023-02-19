import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product-model';
import { ProductReducerState } from '../../state/product.reducer';
import { getCurrentProduct, getIsEditMode } from '../../state/product.selectors';
import * as ProductPageAction from './../../state/actions/product-page-actions';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsAddComponent implements OnInit {

  chosenProduct$?: Observable<Product | undefined>;
  isEditMode$!: Observable<boolean>;
  productForm!: FormGroup;

  constructor(private store: Store<ProductReducerState>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: '',
      productCode: '',
      description: '',
      price: ''
    })

    // FormControl is associated in FormBulder, but
    // FormBuilder is much more complex
    // this.productForm = new FormGroup({
    //   productName: new FormControl(),
    //   productCode: new FormControl(),
    //   description: new FormControl(),
    //   price: new FormControl()
    // });

    this.chosenProduct$ = this.store.select(getCurrentProduct);

    this.isEditMode$ = this.store.select(getIsEditMode);
  }

  cancelEditMode(): void {
    this.store.dispatch(ProductPageAction.setIsEditModeOnFalse());
    this.store.dispatch(ProductPageAction.clearCurrentProduct());
  }

  save(): void {
    throw new Error('Method not implemented.');
  }

  populateTestData(): void {
    // required fill all inputs in form
    // this.productForm.setValue({
    //   productName: 'testName',
    //   productCode: 'testCode',
    //   description: 'desc',
    //   price: '39.99'
    // })

    // assign value for choosen inputs
    this.productForm.patchValue({
      productName: 'testName',
      productCode: 'testCode',
    })
  }
}
