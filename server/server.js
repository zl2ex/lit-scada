import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { OPCUAServer, Variant, DataType, StatusCodes} from 'node-opcua';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { verifyToken } from './auth/jwt.js';
import { typeDefs, resolvers } from './graphql/schema/index.js';

dotenv.config();


///////////////////////////////////MONGOOSE////////////////////////////////

await mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
});

/*
let tag = new BaseTag(
    {
        _id: "attx03",
        value: {
            value: true,
            fault: false
        },
        dataType: "DigitalIn",
        group: "default",
        enabled: true,
        opcPath: "OPC[default].hr1",
        readOnly: false,
        writePermissions: 0,
        sampleTimeMs: 1000,
        alarms: {},
        history: 
        {
            enabled: false, 
            minLogTimeS: 10, 
            maxLogTimeS: 30
        },
        unit: "",
        timeStamp: Date.now()
    }
);

console.log(tag);
try 
{
    await tag.save();
} 
catch (error) 
{
    console.log(error);
}
*/
///////////////////////////////////////////////////////////////////////////


////////////////////////////////OPCUA server/////////////////////////////////
/*
const opcuaServer = new OPCUAServer({
    port: 4334,
    resourcePath: "/DemoProject"
});

await opcuaServer.initialize();
console.log("OPC UA Server initalised");


const opcuaAddressSpace = opcuaServer.engine.addressSpace;
const opcuaNamespace = opcuaAddressSpace.getOwnNamespace();


const demoDevice = opcuaNamespace.addObject({
    organizedBy: opcuaAddressSpace.rootFolder.objects,
    browseName: "demoDevice"
});

let demoVarible = 12.345;
setInterval(() => {  demoVarible+=1.23; }, 500);

opcuaNamespace.addVariable({
    componentOf: demoDevice,
    browseName: "demoVarible",
    dataType: "Double",
    minimumSamplingInterval: 1234, // we need to specify a minimumSamplingInterval when using a getter
    value: {
        get:  () => new Variant({dataType: DataType.Double, value: demoVarible })
    }
});

// add a variable named MyVariable2 to the newly created folder "MyDevice"
let variable2 = 10.0;

opcuaNamespace.addVariable({
    componentOf: demoDevice,
    nodeId: "ns=1;b=1020FFAA", // some opaque NodeId in namespace 4
    browseName: "varible2",
    dataType: "Double",    
    minimumSamplingInterval: 1234, // we need to specify a minimumSamplingInterval when using a getter
    value: {
        get: () => new Variant({dataType: DataType.Double, value: variable2 }),
        set: (variant) => {
            variable2 = parseFloat(variant.value);
            return StatusCodes.Good;
        }
    }
});


opcuaServer.start(function() {
    console.log("opcua Server is now listening ... ( press CTRL+C to stop)");
    console.log("port ", opcuaServer.endpoints[0].port);
});

const endpointUrl = opcuaServer.endpoints[0].endpointDescriptions()[0].endpointUrl;
console.log(" the primary server endpoint url is ", endpointUrl );
*/
///////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////

/*

const schemaComposerOptions = {};
const DigitalInTC = composeMongoose(BaseTag, schemaComposerOptions);

// STEP 3: ADD NEEDED CRUD digitalIn OPERATIONS TO THE GraphQL SCHEMA
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  digitalInById: DigitalInTC.mongooseResolvers.findById(),
  digitalInByIds: DigitalInTC.mongooseResolvers.findByIds(),
  digitalInOne: DigitalInTC.mongooseResolvers.findOne(),
  digitalInMany: DigitalInTC.mongooseResolvers.findMany(),
  digitalInDataLoader: DigitalInTC.mongooseResolvers.dataLoader(),
  digitalInDataLoaderMany: DigitalInTC.mongooseResolvers.dataLoaderMany(),
  digitalInByIdLean: DigitalInTC.mongooseResolvers.findById({ lean: true }),
  digitalInByIdsLean: DigitalInTC.mongooseResolvers.findByIds({ lean: true }),
  digitalInOneLean: DigitalInTC.mongooseResolvers.findOne({ lean: true }),
  digitalInManyLean: DigitalInTC.mongooseResolvers.findMany({ lean: true }),
  digitalInDataLoaderLean: DigitalInTC.mongooseResolvers.dataLoader({ lean: true }),
  digitalInDataLoaderManyLean: DigitalInTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  digitalInCount: DigitalInTC.mongooseResolvers.count(),
  digitalInConnection: DigitalInTC.mongooseResolvers.connection(),
  digitalInPagination: DigitalInTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  digitalInCreateOne: DigitalInTC.mongooseResolvers.createOne(),
  digitalInCreateMany: DigitalInTC.mongooseResolvers.createMany(),
  digitalInUpdateById: DigitalInTC.mongooseResolvers.updateById(),
  digitalInUpdateOne: DigitalInTC.mongooseResolvers.updateOne(),
  digitalInUpdateMany: DigitalInTC.mongooseResolvers.updateMany(),
  digitalInRemoveById: DigitalInTC.mongooseResolvers.removeById(),
  digitalInRemoveOne: DigitalInTC.mongooseResolvers.removeOne(),
  digitalInRemoveMany: DigitalInTC.mongooseResolvers.removeMany(),
});


const graphqlSchema = schemaComposer.buildSchema();
*/


const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyToken);

const apolloServer = new ApolloServer({ 
    schema: buildSubgraphSchema({ typeDefs, resolvers })
});

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

app.listen(process.env.PORT, () => {
    console.log('express server is running on ' + process.env.PORT);
});