import {Htag} from "../components";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import {MenuItem} from "../interfaces/menu.interface";
import axios from "axios";
import {API} from "../helpers/api";

function Home(): JSX.Element {

    return (
        <>
            <Htag tag={'h1'}>Выберите категорию в меню</Htag>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory});

    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}
