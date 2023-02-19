import { createReducer, on } from "@ngrx/store";
import * as ProductPageAction from './actions/product-page-actions';
import * as ProductApiAction from './actions/product-api-actions';
import { ProductState } from "./product.state";

export interface ProductReducerState {
    products: ProductState
};

const initialState: ProductState = {
    showProductCode: false,
    currentProductId: 0,
    currentProduct: undefined,
    products: [],
    isEditMode: false,
    error: ''
};

export const ProductReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageAction.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductPageAction.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
    on(ProductPageAction.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: undefined
        }
    }),
    on(ProductPageAction.initializeNewProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: '',
                description: '',
                price: 0
            }
        }
    }),
    on(ProductPageAction.setIsEditModeOnFalse, (state): ProductState => {
        return {
            ...state,
            isEditMode: false
        }
    }),
    on(ProductPageAction.setIsEditModeOnTrue, (state): ProductState => {
        return {
            ...state,
            isEditMode: true
        }
    }),
    on(ProductPageAction.setCurrentProductId, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.productId
        }
    }),
    on(ProductApiAction.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductApiAction.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductApiAction.updateProductSuccess, (state, action): ProductState => {
        console.log(action.productId);
        return {
            ...state
        }
    }),
    on(ProductApiAction.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);