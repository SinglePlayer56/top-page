import {Button, Htag, Input, P, Rating, Tag, TextArea} from "../components";
import {useState} from "react";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import {MenuItem} from "../interfaces/menu.interface";
import axios from "axios";
import {API} from "../helpers/api";

function Home({menu}: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(1);

    return (
        <>
            <Htag tag={'h1'}>Текст</Htag>
            <Button appearance={'primary'} arrow={'right'}>Кнопка</Button>
            <Button appearance={'ghost'} arrow={'down'}>Кнопка2</Button>
            <P size={'16'}>
                Напишу сразу в двух курсах, так как проходил оба. Java будет многим непросвещённым сложновата в
                изучении, но здесь перевес из-за лидирующего положения языка как самого популярного в программировании.
                Выбор мой пал на эту профессию еще и потому, что Java-разработчики получают самую большую зарплату. Хотя
                Python начинает догонять Java по многим моментам, но вот в крупном екоме разработке Джава все-таки
                остается главенствующей сейчас. Скажу так – полнота программы и интенсивность присуща обоим курсам
                GeekBrains. Хочу отметить, что с первого дня занятий вы приступаете к практике и получаете опыт
                коммерческой разработки уже в свое резюме. Скажу вам как прошедший это – реально помогло в
                трудоустройстве!
            </P>
            <Tag size={'m'} color={"green"}>Green</Tag>
            <Tag size={'m'} color={"primary"}>Primary</Tag>
            <Tag size={'m'} color={"ghost"}>Ghost</Tag>
            <Tag size={'s'} color={"red"}>Red</Tag>
            <Tag size={'s'} color={"grey"}>Grey</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder={'Input'}/>
            <TextArea placeholder={'TextArea'}/>
            <ul>
                {menu.map((item) => (<li key={item._id.secondCategory}>{item._id.secondCategory}</li>))}
            </ul>
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
