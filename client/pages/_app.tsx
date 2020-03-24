import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../utils/apollo-config';

const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default withData(MyApp);
