import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline } from "@mui/material";

const TeamHealthCheck = ({ Component, pageProps }: AppProps) => (
  <CssBaseline>
    <Component {...pageProps} />
  </CssBaseline>
);

export default TeamHealthCheck;
