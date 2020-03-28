import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { Button } from '@blueprintjs/core';

import styles from './index.module.css';

const index = () => {
  const router = useRouter();
  return (
    <div className={styles.Container}>
      <h1>Welcome To The Ideas App</h1>
      <div className={styles.ActionButtons}>
        <Button
          icon='airplane'
          type='button'
          onClick={() => router.push('/signup')}
          large
          intent='primary'
        >
          Sign Up
        </Button>
        <Button
          icon='log-in'
          type='button'
          large
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default index;
