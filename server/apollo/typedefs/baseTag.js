import { GraphQLDateTime } from "graphql-scalars";

import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";


const Alarms = new GraphQLObjectType({
    name: "Alarms",
    fields: {
        enabled: { type: GraphQLBoolean}
    }
});

const History = new GraphQLObjectType({
    name: "History",
    fields: {
        enabled:     { type: GraphQLBoolean},
        minLogTimeS: { type: GraphQLInt},
        maxLogTimeS: { type: GraphQLInt}
    }
});

export const BaseTag = new GraphQLObjectType({
    name: "BaseTag",
    fields: {
        _id:             { type: GraphQLString},
        dataType:        { type: GraphQLString},
        group:           { type: GraphQLString},
        enabled:         { type: GraphQLBoolean},
        opcPath:         { type: GraphQLString},
        readOnly:        { type: GraphQLBoolean},
        writePermissions:{ type: GraphQLInt},
        sampleTimeMs:    { type: GraphQLInt},
        alarms:          { type: Alarms},
        history:         { type: History},
        unit:            { type: GraphQLString},
        timeStamp:       { type: GraphQLDateTime },
    }
});

/*
Apollo 


export const typeDefs = `#graphql

    type Alarms {
        enabled: Boolean
    }

    type History {
        enabled: Boolean, 
        minLogTimeS: Int, 
        maxLogTimeS: Int
    }


    type BaseTag {
        _id: String,
        dataType: String,
        group: String,
        enabled: Boolean,
        opcPath: String,
        readOnly: Boolean,
        writePermissions: Int,
        sampleTimeMs: Int,
        alarms: Alarms,
        history: History,
        unit: String,
        timeStamp: GraphQLDateTime,
    }

`;

*/