import {ITopPageModel, TopLevelCategory} from "../../interfaces/page.intefrace";
import {IProductModel} from "../../interfaces/product.interface";

export interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: ITopPageModel;
    products: IProductModel[];
}
