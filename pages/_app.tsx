import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { NextComponentType } from "next";
import { Component } from "react";

// type Props = {
//   children: JSX.Element;
// };

// type ModAppProps = AppProps & {
//   Component: NextComponentType & {Layout: (props: Props) => JSX.Element}
// };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// const EmptyLayout = (props: Props) => <>{props.children}</>;
