import "../styles/global.scss";
import AppProvider from "../reducer/Provider";

const MyApp = ({ Component, pageProps }) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
);

export default MyApp;
