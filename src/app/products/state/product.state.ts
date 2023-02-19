import { Product } from "../product-model"

export interface ProductState {
    showProductCode: boolean,
    currentProductId: Number,
    currentProduct?: Product
    products: Product[],
    isEditMode: boolean,
    error: String
};