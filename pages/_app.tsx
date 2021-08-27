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
      <Provider session={pageProps.session}>
        <StoreProvider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </Provider>
    </NotificationContextProvider>
  );
}
export default MyApp;
