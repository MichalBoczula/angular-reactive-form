import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './state/product.reducer';
import { ProductsAddComponent } from './products-add/products-add/products-add.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductInMemoryDb } from './services/ProductInMemoryDb';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsEditComponent,
    ProductsAddComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('products', ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
    ReactiveFormsModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(ProductInMemoryDb)
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductsModule { }
