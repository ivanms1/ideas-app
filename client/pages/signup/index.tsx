import React from 'react';
import { Formik, Form } from 'formik';

import styles from './signup.module.css';

const Signup = () => {
  return (
    <div className={styles.Container}>
      <h1>Signup Page</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={() => {}}
      >
        {() => <Form></Form>}
      </Formik>
    </div>
  );
};

export default Signup;
