import { useAppContext } from "../reducer/Provider";
import Head from "next/head";
import Header from "../components/Header";
import Images from "../components/Images";
import Footer from "../components/Footer";
import Add from "../components/Add";

const Home = () => {
  const [state, dispatch] = useAppContext();
  const { theme, popup } = state;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
      </Head>
      {popup && <Add />}
      <div className={`App bgc-${theme}`}>
        <div className="container">
          <Header />
          <Images />
          <Footer />
        </div>
      </div>
      <style jsx>{`
        .App {
          display: flex;
          transition: all 0.4s;
        }
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          max-width: 1200px;
          width: 95%;
          margin: auto;
        }
      `}</style>
    </>
  );
};

export default Home;
