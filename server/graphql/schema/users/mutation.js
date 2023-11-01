import { GraphQLError } from 'graphql';

import { UserDB } from './db.js';

function validateEmail(email)
{
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if(regex.test(email)) 
    {
      return true;
    } 

    return false;
}

export const UserMutation = 
{
    async createUser(_,args)
    {
        if(await UserDB.exists({email: args.userInput.email}))
        {
            throw new GraphQLError('User with that email already exists', {
                extensions: {
                    code: "BAD_USER_INPUT",
                    feilds: [
                        {field: "email", message: "User with that email already exists"}
                    ]
                }
            });
        }

        if(validateEmail(args.userInput.email) == false)
        {
            throw new GraphQLError('invalid email', {
                extensions: {
                    code: "BAD_USER_INPUT",
                    feilds: [
                        {field: "email", message: "invalid or missing email"}
                    ]
                }
            });
        }

        if(args.userInput.username == null)
        {
            throw new GraphQLError('please provide a username', {
                extensions: {
                    code: "BAD_USER_INPUT",
                    feilds: [
                        {field: "username", message: "please provide a username"}
                    ]
                }
            });
        }

        if(args.userInput.password == null)
        {
            throw new GraphQLError('please provide a password', {
                extensions: {
                    code: "BAD_USER_INPUT",
                    feilds: [
                        {field: "password", message: "please provide a password"}
                    ]
                }
            });
        }



        const newUser = new UserDB(args.userInput);
        const user = await newUser.save();
        return user;
    },
};