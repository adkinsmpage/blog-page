import { Provider } from "next-auth/client";
import { Provider as StoreProvider } from "react-redux";
import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";
import { NotificationContextProvider } from "../store/notificationContext";
import { store } from "../store/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <StoreProvider store={store}>
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </StoreProvider>
    </NotificationContextProvider>
  );
}
export default MyApp;
