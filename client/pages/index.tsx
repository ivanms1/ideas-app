import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';

import QUERY_HELLO_WORLD from './queryHello.graphql';

const Home = () => {
  const { data, loading } = useQuery(QUERY_HELLO_WORLD);

  if (loading || !data) {
    return <p>Loading...</p>;
  }
  return (
    <div className='container'>
      <Head>
        <title>Boilerplate App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>{data.hello}</h1>
    </div>
  );
};

export default Home;
