import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from '@blueprintjs/core';

import CustomInput from '../../components/Formik/CustomInput';
import { AppToast } from '../../components/Toaster';

import MUTATION_SIGNUP from './mutationSignup.graphql';

import styles from './signup.module.css';

const Signup = () => {
  const router = useRouter();
  const [signup, { loading }] = useMutation(MUTATION_SIGNUP);
  return (
    <div className={styles.Container}>
      <h1>Signup Page</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={yup.object().shape({
          name: yup.string().required('Name is required'),
          email: yup
            .string()
            .email('this is not a valid email')
            .required('Email is required'),
          password: yup.string().required('Password is required'),
        })}
        onSubmit={async (values) => {
          try {
            const res = await signup({
              variables: {
                input: values,
              },
            });

            if (res.data.signup.status === 'ok' && res.data.signup.userId) {
              router.push(`/home/${res.data.signup.userId}`);
            }
          } catch (error) {
            AppToast?.show({ message: 'an error ocurred', intent: 'danger' });
          }
        }}
      >
        {() => (
          <Form className={styles.Form}>
            <Field
              name='name'
              placeholder='Name'
              large
              component={CustomInput}
            />
            <Field
              name='email'
              type='email'
              placeholder='Email'
              large
              component={CustomInput}
            />
            <Field
              name='password'
              type='password'
              placeholder='Password'
              large
              component={CustomInput}
            />
            <Button large fill intent='primary' type='submit' loading={loading}>
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <span>Already have an account?</span>{' '}
        <Button minimal intent='primary' onClick={() => router.push('/login')}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
