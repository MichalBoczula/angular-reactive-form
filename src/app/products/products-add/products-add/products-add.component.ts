import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product-model';
import { ProductReducerState } from '../../state/product.reducer';
import { getCurrentProduct, getIsEditMode } from '../../state/product.selectors';
import * as ProductPageAction from './../../state/actions/product-page-actions';
import { debounceTime, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

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

  private validationMessages = {
    required: 'Email is required',
    'the same emails': 'Emails must be the same'
  }

  get addresses(): FormArray {
    return this.productForm.get('addresses') as FormArray;
  }

  emailMessages = '';

  showAddress = false;

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
      }, { validator: emailValidation }),
      addresses: this.formBuilder.array([this.buildAddress()])
    });

    // this.productForm.get('emailGroup')?.valueChanges.subscribe(
    //   value => this.displayChanges(value));

    const emailGroup = this.productForm.get('emailGroup');

    emailGroup?.valueChanges.pipe(debounceTime(1000))
      .subscribe(value => this.setMessage(emailGroup));

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

  buildAddress(): FormGroup {
    return this.formBuilder.group({
      city: '',
      street: '',
      postCode: ''
    })
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  cancelEditMode(): void {
    this.store.dispatch(ProductPageAction.setIsEditModeOnFalse());
    this.store.dispatch(ProductPageAction.clearCurrentProduct());
  }

  save(): void {
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

  displayChanges(value: string): void {
    console.log(value);
  }

  setMessage(control: AbstractControl | null): void {
    this.emailMessages = '';
    if ((control?.touched || control?.dirty) && control?.errors) {
      Object.keys(control.errors).forEach(x => {
        if (x === 'the same emails') {
          this.emailMessages += this.validationMessages['the same emails']
        }
        if (x === 'required') {
          this.emailMessages += ` ${this.validationMessages.required}`
        }
      });
    }

    console.log(this.emailMessages);
  }

  setShowAddress() {
    this.showAddress = !this.showAddress;
  }
}
