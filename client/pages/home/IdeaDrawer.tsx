import React from 'react';
import * as yup from 'yup';
import { Drawer, Button } from '@blueprintjs/core';
import { useRouter } from 'next/dist/client/router';
import { Formik, Form, Field } from 'formik';

import CustomInput from '../../components/Formik/CustomInput';

import MUTATION_CREATE_IDEA from './mutationCreateIdea.graphql';
import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

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
  const [createIdea, { loading }] = useMutation(MUTATION_CREATE_IDEA, {
    update: (cache, { data: createIdea }) => {
      const data: any = cache.readQuery({
        query: QUERY_GET_IDEAS,
      });

      cache.writeQuery({
        query: QUERY_GET_IDEAS,
        data: {
          ideas: [...data.ideas, createIdea.createIdea],
        },
      });
    },
  });
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={Drawer.SIZE_SMALL}
      title={idea || 'Create an Idea'}
    >
      <Formik
        initialValues={{ name: idea?.name || '', summary: idea?.summary || '' }}
        onSubmit={async (values) => {
          try {
            await createIdea({
              variables: {
                input: {
                  ...values,
                  createdBy: router.query.id,
                },
              },
            });
            onClose();
          } catch (error) {
            AppToast?.show({
              message: 'an error ocurred, please try again',
              intent: 'danger',
            });
          }
        }}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .test('is-too-long', 'Name is too long', (value) =>
              value ? value.split(' ').length < 8 : true
            )
            .required('A name is required'),
          summary: yup
            .string()
            .test(
              'is-too-long',
              'Summary should be less than 20 words',
              (value) => (value ? value.split(' ').length < 20 : true)
            )
            .required('A summary is required'),
        })}
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
