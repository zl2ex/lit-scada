import { gql } from 'graphql-tag';

import { GraphQLDateTime, GraphQLJSONObject } from 'graphql-scalars';
//import { GraphQLDateTimeResolver } from 'graphql-scalars';

import { UserType, UserQuery, UserMutation } from './users/index.js';
import { TagType, TagQuery, TagMutation } from './tags/index.js';

// remember we only use gql in this file. types in other files are just simple strings
export const typeDefs = gql`
    scalar ${GraphQLDateTime}
    scalar ${GraphQLJSONObject}
    type Query
    type Mutation
    ${UserType}
    ${TagType}

`;

export const resolvers = {
    //DateTime: ScalarDateTimeResolver,

    Query: {
        ... UserQuery,
        ... TagQuery
    },
    Mutation: {
        ... UserMutation,
        ... TagMutation
    }
};