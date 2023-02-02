import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import {TopLevelCategory} from "../../interfaces/page.intefrace";
import {API} from "../../helpers/api";

export const Type = ({firstCategory} :TypeProps):JSX.Element => {
    return (
        <>
            Выберите категорию
        </>
    );
};

export default withLayout(Type);
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}) => {
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

    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory: firstCategoryItem.id});

    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id
        }
    };
};

interface TypeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
}
