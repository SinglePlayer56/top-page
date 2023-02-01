import {TopPageComponentProps} from "./TopPageComponent.props";
import {Advantages, Htag, Product, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/page.intefrace";
import {HhData} from "../../components/HhData/HhData";
import React, {useEffect, useReducer} from "react";
import {SortEnum} from "../../components/Sort/Sort.props";
import {sortReducer} from "../../components/Sort/sort.reducer";
import {useReducedMotion} from "framer-motion";

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts,sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort});
    };

    useEffect(() => {
        dispatchSort({type: 'reset', initialState: products});
    },[products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag={'h1'}>{page.title}</Htag>
                {products && <Tag color={'grey'} size={"m"} aria-label={products.length + 'элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div role={"list"}>
                {sortedProducts && sortedProducts.map(p => (<Product role={"listitem"} layout={!shouldReduceMotion} product={p} key={p._id}/>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={'h2'}>Вакансии - {page.category}</Htag>
                <Tag color={'red'} size={"m"}>hh.ru</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag={'h2'}>Преимущества</Htag>
                <Advantages advantages={page.advantages}/>
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText}} />}
            <Htag tag={'h2'}>Получаемые навыки</Htag>
            {page.tags && page.tags.length > 0 && page.tags.map(tag => (<Tag key={tag} color={"primary"}>{tag}</Tag>))}
        </div>
    );
};
