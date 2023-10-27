import { gql } from 'graphql-tag';
import { UserType, UserQuery, UserMutation } from './users/index.js';

// remember we only use gql in this file. types in other files are just simple strings
export const typeDefs = gql`
    type Query
    type Mutation
     ${UserType}
`;

export const resolvers = {
   Query: {
       ... UserQuery
   },
   Mutation: {
       ... UserMutation
   }
};