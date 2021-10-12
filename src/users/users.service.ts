// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// import { Users } from './users.schema';

// @Injectable()
// export class ArtsService {
//   constructor(@InjectModel('Users') private readonly UsersSchema: Model<User>) {}

//   async insertUser(title: string, desc: string, price: number) {
//     const newUser = new this.Users({
//       title,
//       description: desc,
      
//     });
//     const result = await newUser.save();
//     return result.id as string;
//   }

//   async getUsers() {
//     const arts = await this.UsersSchema.find().exec();
//     return arts.map((art) => ({
//       id: art.id,
//       title: art.title,
//       description: art.description,
    
//     }));
//   }