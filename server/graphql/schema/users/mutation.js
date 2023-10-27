import { UserDB } from './db.js';

export const UserMutation = 
{
    async createUser(_,args)
    {
        console.log("createUser");
        const newUser = new UserDB(args.userInput);
        const user = await newUser.save();
        return user;
    },
};