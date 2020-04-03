import React from 'react';
import { useRouter } from 'next/dist/client/router';

import { useQuery, useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import { Card, Elevation, Icon, Intent } from '@blueprintjs/core';

import QUERY_GET_IDEAS from './queryGetIdeas.graphql';
import MUTATION_LIKE_IDEA from './mutationLikeIdea.graphql';

import styles from './ExploreIdeas.module.css';

const didUserLike = (likes: any, userId: any) => {
  return likes.some((like: any) => like._id == userId);
};

const ExploreIdeas = () => {
  const router = useRouter();
  const { data, loading } = useQuery(QUERY_GET_IDEAS);
  const [likeIdea] = useMutation(MUTATION_LIKE_IDEA);

  if (loading || !data) {
    return <p>Loading...</p>;
  }
  const userId = router.query.id;

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
            <div className={styles.LikesContainer}>
              <Icon
                className={classNames(styles.Heart, {
                  [styles.notLiked]: !didUserLike(idea.likes, userId)
                })}
                icon='heart'
                color={didUserLike(idea.likes, userId) ? 'red' : 'white'}
                onClick={async () =>
                  await likeIdea({
                    variables: {
                      id: idea._id,
                      action: didUserLike(idea.likes, userId)
                        ? 'DISLIKE'
                        : 'LIKE',
                      userId
                    }
                  })
                }
              />
              <span>{idea.likes.length}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreIdeas;
