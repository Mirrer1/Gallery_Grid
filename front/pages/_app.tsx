import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import GlobalStyle from 'styles/global';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Gallery Grid</title>
      </Head>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
