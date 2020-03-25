import { gql } from 'apollo-server-express';

const UserSchema = gql`
  type User {
    _id: ID
    name: String
    email: String
    ideas: [Idea]
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  extend type Query {
    getUser(id: ID): User
  }

  extend type Mutation {
    createUser(input: UserInput): User
    login(email: String, password: String): User
  }
`;

export default UserSchema;
