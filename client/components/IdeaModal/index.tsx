import React from 'react';
import { Dialog } from '@blueprintjs/core';

import styles from './IdeaModal.module.css';

interface IdeaModalProps {
  idea: {
    name: string;
    summary: string;
    createdBy: {
      _id: string;
      name: string;
    };
  };

  isOpen: boolean;
  onClose: () => void;
}

const IdeaModal = ({ idea, isOpen, onClose }: IdeaModalProps) => {
  return (
    <Dialog
      className={styles.IdeaModal}
      isOpen={isOpen}
      onClose={onClose}
      title={idea.name}
    >
      {console.log(idea)}
      <div className={styles.Container}>
        <p>{idea.summary}</p>
        <p>Created By: {idea.createdBy.name}</p>
      </div>
    </Dialog>
  );
};

export default IdeaModal;
