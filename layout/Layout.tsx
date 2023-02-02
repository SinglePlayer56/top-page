import {ILayoutProps} from "./Layout.props";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {FunctionComponent, useState, KeyboardEvent, useRef} from "react";
import styles from './Layout.module.css';
import {AppContextProvider, IAppContext} from "../context/app,context";
import {Up} from "../components";
import cn from "classnames";

const Layout = ({children}: ILayoutProps): JSX.Element => {
    const [isSkipDisplayed, setIsSkipDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code === 'Space' || key.code == 'Enter') {
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipDisplayed(false);
    };

    return (
        <div className={styles.wrapper}>
            <a
                onFocus={() => setIsSkipDisplayed(true)}
                tabIndex={0}
                className={cn(styles.skipLink, {
                    [styles.displayed]: isSkipDisplayed
                })}
                onKeyDown={skipContentAction}
            >Сразу к содержанию</a>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.body} ref={bodyRef} tabIndex={0} role={"main"}>
                {children}
            </main>
            <Footer className={styles.footer}/>
            <Up/>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props}/>
                </Layout>
            </AppContextProvider>
        );
    };
};
