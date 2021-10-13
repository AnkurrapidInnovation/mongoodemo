import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users,UsersDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>){}


    // async createUser(user:Users):Promise<Users>{
    //     try {
    //         const data = new this.usersModel(user);
    //         const result = await data.save();
    //         return result ;

    //     } catch(e) {
    //         throw new Error(e);
    //     }
    // }

    async createUser(firstName: string, lastName: string) {
        const newUser = new this.usersModel({
         firstName,
         lastName
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async allUsers():Promise<Users[]>{
        try {
            return this.usersModel.find().exec();
        } catch(e) {
            throw new Error(e);
        }
    }
}
