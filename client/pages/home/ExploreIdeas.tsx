import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import QUERY_GET_IDEAS from './queryGetIdeas.graphql';

const ExploreIdeas = () => {
  const { data, loading } = useQuery(QUERY_GET_IDEAS);

  if (loading || !data) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h3>Explore Some Projects Ideas</h3>
      <div></div>
    </div>
  );
};

export default ExploreIdeas;
