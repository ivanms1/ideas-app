import React from 'react';
import { Drawer, Button } from '@blueprintjs/core';
import { useRouter } from 'next/dist/client/router';
import { Formik, Form, Field } from 'formik';

import CustomInput from '../../components/Formik/CustomInput';

import MUTATION_CREATE_IDEA from './mutationCreateIdea.graphql';

import styles from './IdeaDrawer.module.css';
import { useMutation } from '@apollo/react-hooks';
import { AppToast } from '../../components/Toaster';

interface IdeaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  idea?: {
    name: string;
    summary: string;
  };
}

const IdeaDrawer = ({ isOpen, onClose, idea }: IdeaDrawerProps) => {
  const router = useRouter();
  const [createIdea, { loading }] = useMutation(MUTATION_CREATE_IDEA);
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={Drawer.SIZE_SMALL}
      title={idea || 'Create an Idea'}
    >
      <Formik
        initialValues={{ name: idea?.name || '', summary: idea?.summary || '' }}
        onSubmit={async values => {
          try {
            await createIdea({
              variables: {
                input: {
                  ...values,
                  createdBy: router.query.id
                }
              }
            });
            onClose();
          } catch (error) {
            AppToast?.show({
              message: 'an error ocurred, please try again',
              intent: 'danger'
            });
          }
        }}
      >
        {() => (
          <Form className={styles.Form}>
            <Field
              name='name'
              component={CustomInput}
              label='Name'
              helperText='The name of your Idea'
            />
            <Field
              name='summary'
              component={CustomInput}
              type='textarea'
              label='Summary'
              helperText='Brief description of your idea'
              fill
            />

            <Button
              className={styles.CreateButton}
              intent='primary'
              large
              icon='add'
              type='submit'
              loading={loading}
            >
              Create Idea
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default IdeaDrawer;
