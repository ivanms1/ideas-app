import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import { Card, Elevation, Icon, Intent } from '@blueprintjs/core';

import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

import styles from './ExploreIdeas.module.css';

const ExploreIdeas = () => {
  const { data, loading } = useQuery(QUERY_GET_IDEAS);

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3 className={styles.Title}>Explore Some Projects Ideas</h3>
      <div className={styles.Ideas}>
        {data.ideas.map((idea: any) => (
          <Card
            className={styles.Idea}
            key={idea._id}
            interactive
            elevation={Elevation.TWO}
          >
            <h3>{idea.name}</h3>
            <p>{idea.summary}</p>
            <Icon
              className={classNames(styles.Heart, styles.notLiked)}
              icon='heart'
              color='white'
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreIdeas;
