import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'

import { store } from '../src/state/store'
import Header from "../src/components/Header";
import darkTheme from "../src/theme";

const TeamHealthCheck = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Head>
          <title>Team Health Check</title>
          <meta name="description" content="Team Health Check" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  </Provider>
);

export default TeamHealthCheck;
