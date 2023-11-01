import { TagDB } from './db.js';
import { GraphQLError } from 'graphql';

export const TagQuery = 
{
    async getTag(_,args)
    {
        console.log("get tag " + args._id);
        const tag = await TagDB.findById(args._id);

        console.log(tag);

        if(tag === null) throw new GraphQLError('Tag   ' + args._id + '   not defined on server ');
        return tag;
    },

    async getTags()
    {
        console.log("getTags");
    }
};