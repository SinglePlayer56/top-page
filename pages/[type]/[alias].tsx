import {withLayout} from "../../layout/Layout";
import {MenuItem} from "../../interfaces/menu.interface";
import {ITopPageModel, TopLevelCategory} from "../../interfaces/page.intefrace";
import axios from "axios";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {ParsedUrlQuery} from "querystring";
import {IProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import {TopPageComponent} from "../../page-components";
import {API} from "../../helpers/api";

const TopPage = ({page, products, firstCategory}: TopPageProps):JSX.Element => {
    return (
        <>
            <TopPageComponent
                firstCategory={firstCategory}
                page={page}
                products={products}
            />
        </>
    );
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory: m.id});
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths: paths,
        fallback: true
    };
};
export const getStaticProps:GetStaticProps<TopPageProps> = async ({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true
        };
    }

    try {
        const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory: firstCategoryItem.id});
        if (menu.length === 0) {
            return {
                notFound: true
            };
        }
        const {data: page} = await axios.get<ITopPageModel>(API.topPage.byAlias + params.alias);
        const {data: products} = await axios.post<IProductModel[]>(API.product.find, {category: page.category, limit: 10});

        return {
            props: {
                menu,
                page,
                products,
                firstCategory: firstCategoryItem.id
            }
        };
    } catch {
        return {
            notFound: true
        };
    }
};



interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    page: ITopPageModel;
    products: IProductModel[];
    firstCategory: TopLevelCategory;
}
