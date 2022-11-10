import Head from 'next/head'
import Image from 'next/image'
import Copykitt from '../Components/copykitt'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Tool Fool</title>
        <meta name="description" content="Generated branding snippets for your product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Copykitt />
    </div>
  );
};

