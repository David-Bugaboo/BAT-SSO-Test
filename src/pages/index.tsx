import type { NextPage } from "next";
import Head from "next/head";
import Login from '../section/Login/Login'
import styles from '../styles/Home.module.scss'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BAT</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <Login />
      </div>
    </>
  );
};

export default Home;
