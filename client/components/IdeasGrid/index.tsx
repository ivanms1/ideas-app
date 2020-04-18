import React from 'react';
import { useRouter } from 'next/dist/client/router';

import IdeaCard from '../IdeaCard';

import styles from './IdeasGrid.module.css';

interface IdeasGridProps {
  ideas: {
    _id: string;
    name: string;
    summary: string;
    likes: { _id: string }[];
    createdBy: {
      _id: string;
      name: string;
    };
  }[];
}

const IdeasGrid = ({ ideas }: IdeasGridProps) => {
  const router = useRouter();

  const userId = router.query.id;
  return (
    <div className={styles.Ideas}>
      {ideas.length > 0 ? (
        ideas.map((idea) => <IdeaCard idea={idea} userId={userId} />)
      ) : (
        <p>No Ideas yet :/</p>
      )}
    </div>
  );
};

export default IdeasGrid;
