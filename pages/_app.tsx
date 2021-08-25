import { Provider } from "next-auth/client";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { NotificationContextProvider } from "../store/notificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </NotificationContextProvider>
  );
}
export default MyApp;
