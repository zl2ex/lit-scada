const userDataTypes = /* GraphQL */`
    type DigitalIn {
        value: Boolean!
        fault: Boolean!
    }

    input DigitalInInput {
        value: Boolean!
        fault: Boolean!
    }
`;






export const TagType = /* GraphQL */`

    ${userDataTypes}

    type History {
        enabled: Boolean!
        maxLogTimeS: Int!
        minLogTImeS: Int!
    }

    input HistoryInput {
        enabled: Boolean!
        maxLogTimeS: Int!
        minLogTImeS: Int!
    }

    type Alarm {
        enabled: Boolean!
        message: String!
    }

    input AlarmInput {
        enabled: Boolean!
        message: String!
    }

    type Tag {
        _id:              String!
        data:             JSONObject!
        dataType:         String!
        timeStamp:        DateTime!
        group:            String!
        enabled:          Boolean!
        opcPath:          String!
        readOnly:         Boolean!
        writePermissions: Int!
        sampleTimeMs:     Int!
        alarms:           Alarm!
        history:          History!
        unit:             String
    }

    input TagInput {
        _id:              String!
        data:             JSONObject
        dataType:         String!
        timeStamp:        DateTime
        group:            String
        enabled:          Boolean
        opcPath:          String!
        readOnly:         Boolean
        writePermissions: Int
        sampleTimeMs:     Int!
        alarms:           AlarmInput
        history:          HistoryInput
        unit:             String
    }

    extend type Query {
        getTag(_id:String!): Tag!
        getTags(_id:String!): [Tag!]
    }

    extend type Mutation {
        createTag(tagInput:TagInput!):Tag!
    }
`;