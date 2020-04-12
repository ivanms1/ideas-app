import React from 'react';

import { Elevation, Card, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';

import MUTATION_LIKE_IDEA from './mutationLikeIdea.graphql';
import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

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
  const [likeIdea] = useMutation(MUTATION_LIKE_IDEA, {
    update: (cache, { data: likeIdea }) => {
      const data: any = cache.readQuery({
        query: QUERY_GET_IDEAS,
      });

      cache.writeQuery({
        query: QUERY_GET_IDEAS,
        data: {
          ideas: data.ideas.map((idea: any) =>
            idea._id === likeIdea._id ? likeIdea : idea
          ),
        },
      });
    },
  });

  const userId = router.query.id;
  return (
    <div className={styles.Ideas}>
      {ideas.length > 0 ? (
        ideas.map((idea) => (
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
        ))
      ) : (
        <p>No Ideas yet :/</p>
      )}
    </div>
  );
};

export default IdeasGrid;
