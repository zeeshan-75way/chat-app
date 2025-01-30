import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    online: Boolean!
    password: String!
    role: String!
    refreshToken: String
    forgotPasswordToken: String
    forgotPasswordTokenExpiry: String
  }
  type Token {
  token : String
  }

  type Message {
    id: ID!
    sender: User!
    receiver: User!
    content: String
    media: String
    status: String!
    createdAt: String!
  }

  type Query {
    users: [User]
    messages(sender: ID!, receiver: ID!): [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signup(name: String!, email: String!, password: String!): User
  }
`;

export default typeDefs;
