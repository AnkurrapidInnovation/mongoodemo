import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sports, SportsDocument } from './sports.schema';
import   mongoose from 'mongoose';


@Injectable()
export class SportsService {
  constructor(
    @InjectModel(Sports.name)
    private readonly sportsModel: Model<SportsDocument>,
  ) {}

  // async createUser(user:Users):Promise<Users>{
  //     try {
  //         const data = new this.usersModel(user);
  //         const result = await data.save();
  //         return result ;

  //     } catch(e) {
  //         throw new Error(e);
  //     }
  // }

  // async createSport(football: string, basketball: string) {
  //     const newSport = new this.sportsModel({
  //      football,
  //      basketball
  //     });
  //     const result = await newSport.save();
  //     return result.id as string;
  // }

  async createSport(obj): Promise<any> {
    try {
      let createSport = await this.sportsModel.create(obj);
      return createSport;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async getAllSports(obj):Promise<Sports[]>{
  //   try {
  //     const userId = mongoose.Types.ObjectId(obj.usersId);
  //     const sports = await this. sportsModel.aggregate([
  //       {
  //         $match :{
  //           usersId:userId
  //         }
  //       },
  //       {
  //         $lookup:{
  //           from : 'users',
  //           let :{ usersId:'$_id'},
  //           pipeline:[
  //             {
  //               $match :{
  //                 $match:{
  //                   $expr:{$eq:['$usersId','$$usersId']}
  //                 }
  //               }
  //             }
  //           ],
  //           as:'usersDetails'
  //         }
  //       }
  //     ])
  //   }



  async viewAllSports(): Promise<Sports[]> {
    try {
      const sports = await this.sportsModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'usersId',
            foreignField: '_id',
            as: 'usersDetails'
          }
        },
        // {
        //   $project: {
        //    football:1,
        //    basketball:1,
        //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
        //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
        //   }
        // }
      ]);
      return sports;
    } catch (e) {
      throw new Error(e);
    }
  }


  // async viewAllSports(): Promise<Sports[]> {
  //   try {
  //     // const UserId = mongoose.Types.ObjectId(UserId);
  //     const sports = await this.sportsModel.aggregate([
  //       // {
  //       //   $match:{
  //       //     usersId:UserId
  //       //   }
  //       // },
  //       {
  //         $lookup: {
  //           from: 'users',
  //          let:{usersId:'$_usersId'},
  //          pipeline:[
  //            {
  //              $match:{
  //                $expr:{$eq:['$usersId','$$usersId']}
  //              }
  //            }
  //          ],
  //           as: 'usersDetails'
  //         }
  //       },
  //       // {
  //       //   $project: {
  //       //    football:1,
  //       //    basketball:1,
  //       //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
  //       //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
  //       //   }
  //       // }
  //     ]);
  //     return sports;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }


  

  // async allSports(): Promise<Sports[]> {
  //   try {
  //     return this.sportsModel.find().exec();
  //   } catch (e) {
  //     throw new Error(e);
  //   }
   //}
}
