import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { Button } from '@blueprintjs/core';

import CustomInput from '../../components/Formik/CustomInput';

import MUTATION_LOGIN from './mutationLogin.graphql';

import styles from './login.module.css';

const Login = () => {
  const router = useRouter();
  const [login, { loading }] = useMutation(MUTATION_LOGIN);
  return (
    <div className={styles.Container}>
      <h1>Login Page</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async ({ email, password }) => {
          try {
            const res = await login({
              variables: {
                email,
                password
              }
            });

            if (res.data && res.data.login.status === 'ok') {
              router.push(`/home/${res.data.login.userId}`);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form>
            <Field
              name='email'
              type='email'
              component={CustomInput}
              placeholder='Email'
            />
            <Field
              name='password'
              type='password'
              component={CustomInput}
              placeholder='Password'
            />
            <Button type='submit' fill intent='primary' loading={loading}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
