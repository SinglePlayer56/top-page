import {SortEnum} from "./Sort.props";
import {IProductModel} from "../../interfaces/product.interface";


export type SortActions = {type: SortEnum.Rating} | {type: SortEnum.Price} | {type: 'reset', initialState: IProductModel[]};

export interface SortReducerState {
    sort: SortEnum;
    products: IProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions) => {
    switch (action.type) {
        case SortEnum.Rating:
            return {
                ...state,
                sort: SortEnum.Rating,
                products: [...state.products].sort((a, b) => a.initialRating > b.initialRating ? -1: 1)
            };
        case SortEnum.Price:
            return {
                ...state,
                sort: SortEnum.Price,
                products: [...state.products].sort((a, b) => a.price > b.price ? 1: -1)
            };
        case 'reset': {
            return {
                ...state,
                sort: SortEnum.Rating,
                products: action.initialState
            };
        }
        default:
            throw new Error('Неверная сортировка');
    }
};
