import {withLayout} from "../layout/Layout";
import {Htag} from "../components";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";

export const Search = ():JSX.Element => {
    return (
        <>
           <Htag tag={'h1'}>Search page</Htag>
        </>
    );
};

export default withLayout(Search);

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
