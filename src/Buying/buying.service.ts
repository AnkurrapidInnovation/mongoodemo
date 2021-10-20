import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import   mongoose from 'mongoose';
import { Buyings, BuyingsDocument } from './qualification.schema';


@Injectable()
export class BuyingsService {
  constructor(
    @InjectModel(Buyings.name)
    private readonly buyingsModel: Model<BuyingsDocument>,
  ) {}



  async createBuyings(obj): Promise<any> {
    try {
      let createBuyings = await this.buyingsModel.create(obj);
      return createBuyings;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllBuyings(): Promise<Buyings[]> {
    try {
      const buyings = await this.buyingsModel.aggregate([
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
      return buyings;
    } catch (e) {
      throw new Error(e);
    }
  }
  

  // async viewAllBuyings2(): Promise<Buyings[]> {
  //   try {
  //     const buyings = await this.buyingsModel.aggregate([
  //       {
  //         $lookup: {
  //           from: 'products',
  //           localField: 'productsId',
  //           foreignField: '_id',
  //           as: 'productsDetails'
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
  //     return buyings;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }