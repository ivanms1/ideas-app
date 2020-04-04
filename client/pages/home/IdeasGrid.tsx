import React from 'react';

import { Elevation, Card, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';

import MUTATION_LIKE_IDEA from './mutationLikeIdea.graphql';

import styles from './Ideas.module.css';

const didUserLike = (likes: any, userId: any) => {
  return likes.some((like: any) => like._id == userId);
};

interface IdeasGridProps {
  ideas: {
    _id: string;
    name: string;
    summary: string;
    likes: { _id: string }[];
  }[];
}

const IdeasGrid = ({ ideas }: IdeasGridProps) => {
  const router = useRouter();
  const [likeIdea] = useMutation(MUTATION_LIKE_IDEA);

  const userId = router.query.id;
  return (
    <div className={styles.Ideas}>
      {ideas.map((idea) => (
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
                [styles.notLiked]: !didUserLike(idea.likes, userId),
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
                    userId,
                  },
                })
              }
            />
            <span>{idea.likes.length}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IdeasGrid;
