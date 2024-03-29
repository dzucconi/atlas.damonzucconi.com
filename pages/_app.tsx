import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Box, GlobalStyles, ThemerProvider, useThemer } from "@auspices/eos";
import { FC, ReactElement, ReactNode } from "react";
import { Loader } from "../components/core/Loader";
import { NextPage } from "next";
import Head from "next/head";
import { UrqlProvider } from "../lib/urql";
import { PaginationProvider } from "../lib/usePagination";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const App: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemer();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Loader />

        <Box
          display="flex"
          flexDirection="column"
          p={[0, 0, 2, 4]}
          minHeight="100vh"
        >
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Provided = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UrqlProvider>
      <ThemerProvider>
        <PaginationProvider>
          <App>{getLayout(<Component {...pageProps} />)}</App>
        </PaginationProvider>
      </ThemerProvider>
    </UrqlProvider>
  );
};

export default Provided;
