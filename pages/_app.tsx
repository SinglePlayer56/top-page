import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from "next/head";

export default function App({Component, pageProps}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>My top App</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name={'description'} content={'My app top application'}/>
            </Head>
            <Component {...pageProps} />
        </>
);
}
