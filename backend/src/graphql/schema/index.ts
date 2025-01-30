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
    token: String
  }

  type Message {
    id: ID!
    content: String!
    sender: String!
  }

  type Query {
    users: [User]
    messages: [Message!]!
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signup(name: String!, email: String!, password: String!): User
    sendMessage(content: String!, sender: String!): Message!
  }
  type Subscription {
    newMessage: Message!
  }
`;

export default typeDefs;
