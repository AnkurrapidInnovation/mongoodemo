import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sports, SportsDocument } from './sports.schema';

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

  async allSports(): Promise<Sports[]> {
    try {
      return this.sportsModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }
}
