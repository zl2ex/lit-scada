import { TagDB } from './db.js';
import { GraphQLError } from 'graphql';



export const TagMutation = 
{
    async createTag(_,args)
    {
        console.log(args);
        const tag = new TagDB({
            _id: args.tagInput._id,
            data: args.tagInput.data,
            dataType: args.tagInput.dataType,
            timeStamp: Date.now(),
            group: "default",
            enabled: true,
            opcPath: args.tagInput.opcPath,
            readOnly: false,
            writePermissions: 1,
            sampleTimeMs: args.tagInput.sampleTimeMs,
            alarms: {
                enabled: false,
                message: args.tagInput._id + " alarm"
            },
            history: {
                enabled: false,
                maxLogTimeS: 10000,
                minLogTimeS: 10000
            },
            unit: ""
        });

        return await tag.save();
    }
};