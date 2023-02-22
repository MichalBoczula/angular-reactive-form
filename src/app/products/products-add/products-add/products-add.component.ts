import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product-model';
import { ProductReducerState } from '../../state/product.reducer';
import { getCurrentProduct, getIsEditMode } from '../../state/product.selectors';
import * as ProductPageAction from './../../state/actions/product-page-actions';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function customeValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value === 'aaa') {
    return { 'input': false };
  }
  return null;
}

function customeValidatorWithParam(syntax: string): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value === syntax) {
      return { 'inputWithParam': false };
    }
    return null;
  }
}

function emailValidation(c: AbstractControl): { [key: string]: boolean } | null {
  const email = c.get('email');
  const emailConfirm = c.get('emailConfirm');
  if (email !== emailConfirm) {
    return { 'the same emails': false };
  }
  return null;
}

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
      productName: ['', [Validators.required, customeValidatorWithParam('bbb')]],
      productCode: ['', [Validators.required, customeValidator]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['', [Validators.required, Validators.email]]
      }, { validator: emailValidation })
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

  setNotification(): void {
    const required = this.productForm.get('emailGroup.emailConfirm')?.errors?.['input'];
    console.log(required);
    const aaaa = this.productForm.get('emailGroup');
    console.log(aaaa);
  }
}
