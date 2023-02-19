import { createAction, props } from "@ngrx/store";
import { Product } from "../../product-model";

export const toggleProductCode = createAction(
    'Toggle product code'
);

export const setCurrentProduct = createAction(
    'Set current product',
    props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
    'Clear current product'
);

export const initializeNewProduct = createAction(
    'Initialize current roduct'
);

export const setIsEditModeOnTrue = createAction(
    'Set is edit mode on true'
);

export const setIsEditModeOnFalse = createAction(
    'Set is edit mode on false'
);

export const setCurrentProductId = createAction(
    'Set current product id',
    props<{ productId: Number }>()
);