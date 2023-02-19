import { createAction, props } from "@ngrx/store";
import { Product } from "../../product-model";

export const loadProducts = createAction(
    'Loading products array ... '
);

export const loadProductsSuccess = createAction(
    'Loaded products array success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    'Loaded products array fail',
    props<{ error: String }>()
);

export const updateProduct = createAction(
    'Updating product ... ',
    props<{ product: Product }>
);

export const updateProductSuccess = createAction(
    'Updated product success',
    props<{ productId: Number }>()
);

export const updateProductFailure = createAction(
    'Updated product fail',
    props<{ error: String }>()
);