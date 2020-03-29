import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppProps } from 'next/app';

import withData from '../utils/apollo-config';

import './styles.css';

interface MyAppProps extends AppProps {
  apollo: any;
}

const MyApp = ({ Component, pageProps, apollo }: MyAppProps) => {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default withData(MyApp);
