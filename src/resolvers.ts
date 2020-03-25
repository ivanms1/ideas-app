import { merge } from 'lodash';

import IdeaResolvers from './Idea/IdeaResolvers';
import UserResolvers from './User/UserResolvers';

const resolvers = merge(IdeaResolvers, UserResolvers);

export default resolvers;
