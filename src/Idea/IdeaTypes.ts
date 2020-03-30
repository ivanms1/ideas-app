import { gql } from 'apollo-server-express';

const IdeaSchema = gql`
  enum ActionType {
    UPVOTE
    DOWNVOTE
  }

  type Idea {
    _id: ID!
    name: String!
    summary: String!
    score: Int!
    createdBy: User!
    submissions: [Submission]!
  }

  type Submission {
    url: String!
    repo: String!
    createdBy: User!
  }

  input IdeaInput {
    name: String!
    summary: String!
    createdBy: ID!
  }

  input SubmissionInput {
    url: String
    repo: String
    createdBy: String
  }

  type Query {
    getIdeas: [Idea]
    getIdea(id: ID): Idea
  }

  type Mutation {
    createIdea(input: IdeaInput!): Idea
    deleteIdea(id: ID!): ID
    voteIdea(id: ID!, action: ActionType!): Idea
    updateSubmissions(id: ID!, submissions: [SubmissionInput]): Idea
  }
`;

export default IdeaSchema;
