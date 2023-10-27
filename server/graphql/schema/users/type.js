export const UserType = /* GraphQL */`
    type User {
        _id:ID!
        username:String!
        email:String!
        password:String!
    }

    input UserInput {
        username:String!
        email:String!
        password:String!
    }

    type LoginReturnType {
        token:String
        userId:ID
    }

    extend type Query {
        users:[User!]!
        login(email:String!,password:String!):LoginReturnType!
    }

    extend type Mutation {
        createUser(userInput:UserInput!):User!
    }
`;