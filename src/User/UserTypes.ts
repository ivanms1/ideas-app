import { gql } from 'apollo-server-express';

const UserSchema = gql`
  type User {
    _id: ID
    name: String
    email: String
    ideas: [Idea]
  }

  type LoginResponse {
    status: String!
    userId: ID!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  extend type Query {
    getUser(id: ID): User
  }

  extend type Mutation {
    signup(input: UserInput!): LoginResponse
    login(email: String!, password: String!): LoginResponse
  }
`;

export default UserSchema;
