import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Cars, CarsDocument } from './cars.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Cars.name)
    private readonly carsModel: Model<CarsDocument>,
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
      let createSport = await this.carsModel.create(obj);
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

  async viewAllSports(): Promise<Cars[]> {
    try {
      const sports = await this.carsModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'usersId',
            foreignField: '_id',
            as: 'usersDetails',
          },
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
