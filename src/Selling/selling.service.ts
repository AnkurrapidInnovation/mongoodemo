import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import   mongoose from 'mongoose';
import { Sellings, SellingsDocument } from './selling.schema';


@Injectable()
export class SellingsService {
  constructor(
    @InjectModel(Sellings.name)
    private readonly sellingsModel: Model<SellingsDocument>,
  ) {}



  async createBuyings(obj): Promise<any> {
    try {
      let createSellings = await this.sellingsModel.create(obj);
      return createSellings;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllSellings(): Promise<Sellings[]> {
    try {
      const sellings = await this.sellingsModel.aggregate([
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
      return sellings;
    } catch (e) {
      throw new Error(e);
    }
  }
  

  async viewAllSellings2(): Promise<Sellings[]> {
    try {
      const sellings= await this.sellingsModel.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productsId',
            foreignField: '_id',
            as: 'productsDetails'
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
      return sellings;
    } catch (e) {
      throw new Error(e);
    }
  }

}