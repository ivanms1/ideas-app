import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';
import { Spinner, Icon, Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';

import QUERY_GET_MY_IDEAS from './queryGetMyIdeas.graphql';

import styles from './Ideas.module.css';
import IdeasGrid from './IdeasGrid';

const didUserLike = (likes: any, userId: any) => {
  return likes.some((like: any) => like._id == userId);
};

const OwnIdeas = () => {
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

export default OwnIdeas;
