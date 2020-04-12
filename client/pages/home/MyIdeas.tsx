import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';
import IdeasGrid from '../../components/IdeasGrid';
import { Spinner } from '@blueprintjs/core';

import QUERY_GET_MY_IDEAS from './queryGetMyIdeas.graphql';

import styles from './Ideas.module.css';

const MyIdeas = () => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY_GET_MY_IDEAS, {
    variables: {
      userId: router?.query.id,
    },
    skip: !router || !router.query.id,
  });
  return (
    <div className={styles.IdeasContainer}>
      {data && !loading && Array.isArray(data.ideas) ? (
        <IdeasGrid ideas={data.ideas} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MyIdeas;
