import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/dist/client/router';
import { Formik, Form, Field } from 'formik';
import { Button } from '@blueprintjs/core';

import CustomInput from '../../components/Formik/CustomInput';

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
        onSubmit={async values => {
          try {
            const res = await signup({
              variables: {
                input: values
              }
            });

            if (res.data.status === 'ok' && res.data.userId) {
              router.push(`home/${res.data.userId}`);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form>
            <Field name='name' placeholder='Name' component={CustomInput} />
            <Field
              name='email'
              type='email'
              placeholder='Email'
              component={CustomInput}
            />
            <Field
              name='password'
              type='password'
              placeholder='Password'
              component={CustomInput}
            />
            <Button fill intent='primary' type='submit' loading={loading}>
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
