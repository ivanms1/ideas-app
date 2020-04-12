import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from '@blueprintjs/core';

import IdeasGrid from '../../components/IdeasGrid';

import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

import styles from './Ideas.module.css';

const ExploreIdeas = () => {
  const { data, loading } = useQuery(QUERY_GET_IDEAS);

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

export default ExploreIdeas;
