import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { private_key } from '../../../auth/key.js';
import { UserDB } from './db.js';

export const UserQuery = 
{
    async login(_,{ email, password })
    {
        try 
        {
            const user = await UserDB.findOne({ email });
            if (!user) 
            {
                throw new Error('Invalid Credentials');
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) 
            {
                throw new Error("Invalid Credentials");
            }

            const token = jwt.sign({ _id: user._id, email: user.email }, private_key, {
                algorithm: "RS256",
                expiresIn: "1m"
            });

            return {
                token,
                userId: user._id
            }
        } 
        catch (error) 
        {
            return error;
        }
    }
};