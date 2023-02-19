import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductsService } from "../services/products.service";
import * as ProductpiActions from "./actions/product-api-actions";

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductsService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductpiActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductpiActions.loadProductsSuccess({ products })),
                catchError(err => of(ProductpiActions.loadProductsFailure({ error: err })))
            ))
        )
    });

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductpiActions.updateProduct),
            mergeMap(() => this.productService.updateProduct().pipe(
                map(productId => ProductpiActions.updateProductSuccess({ productId })),
                catchError(err => of(ProductpiActions.loadProductsFailure({ error: err })))
            ))
        )
    });
}