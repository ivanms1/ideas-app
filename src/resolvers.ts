import { merge } from 'lodash';

import IdeaResolvers from './Idea/IdeaResolvers';
import UserResolvers from './User/UserResolvers';
import SubmissionResolvers from './Submission/SubmissionResolver';

const resolvers = merge(IdeaResolvers, UserResolvers, SubmissionResolvers);

export default resolvers;
