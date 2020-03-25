import { gql } from 'apollo-server-express';

const IdeaSchema = gql`
  enum ActionType {
    UPVOTE
    DOWNVOTE
  }

  type Idea {
    _id: ID
    name: String
    score: Int
    createdBy: User
  }

  input IdeaInput {
    name: String
    createdBy: ID
  }

  type Query {
    getIdeas: [Idea]
    getIdea(id: ID): Idea
  }

  type Mutation {
    createIdea(input: IdeaInput): Idea
    deleteIdea(id: ID): ID
    voteIdea(id: ID, action: ActionType): Idea
  }
`;

export default IdeaSchema;
