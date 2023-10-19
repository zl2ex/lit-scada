import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { DigitalIn } from './mongoose/models/digitalInTag.js';

 
const MONGODB = 'mongodb://localhost:27017/demoProject';

mongoose.connect(MONGODB, {
  useNewUrlParser: true
});



const app = express();


let tag = new DigitalIn(
    {
        value: true,
        fault: true,
        name: "aprt03",
        dataType: "DigitalIn",
        group: "default",
        enabled: true,
        opcPath: "OPC[default].hr1",
        readOnly: false,
        writePermissions: 0,
        sampleTimeMs: 1000,
        alarms: {},
        history: {enabled: false, minLogTimeS: 10, maxLogTimeS: 30},
        unit: "",
        timeStamp: Date.now()
    }
);

console.log(tag);
await tag.save();


// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Appollo server ready at ${url}`);

/*
app.listen({ port: 4000 });
console.log('Listening to port 4000');
*/