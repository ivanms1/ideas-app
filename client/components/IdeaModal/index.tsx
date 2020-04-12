import React from 'react';
import { Dialog } from '@blueprintjs/core';

interface IdeaModalProps {
  idea: {
    name: string;
    summary: string;
  };

  isOpen: boolean;
  onClose: () => void;
}

const IdeaModal = ({ idea, isOpen, onClose }: IdeaModalProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={idea.name}>
      <p>{idea.summary}</p>
    </Dialog>
  );
};

export default IdeaModal;
