import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';

import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

const Home = () => {
  const { data, loading } = useQuery(QUERY_GET_IDEAS);

  if (loading || !data) {
    return <p>Loading...</p>;
  }
  return (
    <div className='container'>
      <Head>
        <title>Ideas App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hola</h1>
    </div>
  );
};

export default Home;
