import { gql } from 'apollo-server-express';

const SubmissionSchema = gql`
  type Submission {
    _id: ID!
    idea: Idea!
    url: String!
    repo: String!
    likes: [User]!
    createdBy: User!
  }
  input SubmissionInput {
    url: String
    repo: String
    createdBy: String
  }

  extend type Mutation {
    createSubmission(input: SubmissionInput!): Submission
    deleteSubmission(id: ID!, ideaId: ID!): ID
    likeSubmission(id: ID!, action: ActionType!, userId: ID!): Submission
  }
`;

export default SubmissionSchema;
