import { gql } from 'apollo-server-express';

const IdeaSchema = gql`
  enum ActionType {
    LIKE
    DISLIKE
  }

  type Idea {
    _id: ID!
    name: String!
    summary: String!
    likes: [User]!
    createdBy: User!
    submissions: [Submission]!
  }

  input IdeaInput {
    name: String!
    summary: String!
    createdBy: ID!
  }

  type Query {
    getIdeas: [Idea]
    getIdea(id: ID!): Idea
    getMyIdeas(userId: ID!): [Idea]
  }

  type Mutation {
    createIdea(input: IdeaInput!): Idea
    deleteIdea(id: ID!): ID
    likeIdea(id: ID!, action: ActionType!, userId: ID!): Idea
  }
`;

export default IdeaSchema;
