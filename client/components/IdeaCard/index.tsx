import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import { Elevation, Card, Icon } from '@blueprintjs/core';

import IdeaModal from '../IdeaModal';

import MUTATION_LIKE_IDEA from './mutationLikeIdea.graphql';
import QUERY_GET_IDEAS from '../../pages/home/queryGetIdeas.graphql';

import styles from './IdeaCard.module.css';

interface IdeaCardProps {
  idea: {
    _id: string;
    name: string;
    summary: string;
    likes: { _id: string }[];
    createdBy: {
      _id: string;
      name: string;
    };
  };

  userId: string | string[];
}

const didUserLike = (likes: any, userId: any) => {
  return likes.some((like: any) => like._id == userId);
};

const IdeaCard = ({ idea, userId }: IdeaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  return (
    <React.Fragment>
      <div className={styles.CardContainer}>
        <Card
          className={styles.Idea}
          key={idea._id}
          interactive
          elevation={Elevation.TWO}
          onClick={() => setIsModalOpen(true)}
        >
          <h3>{idea.name}</h3>
          <p>{idea.summary}</p>
        </Card>
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
                  action: didUserLike(idea.likes, userId) ? 'DISLIKE' : 'LIKE',
                  userId,
                },
              })
            }
          />
          <span>{idea.likes.length}</span>
        </div>
      </div>
      <IdeaModal
        isOpen={isModalOpen}
        idea={idea}
        onClose={() => setIsModalOpen(false)}
      />
    </React.Fragment>
  );
};

export default IdeaCard;
