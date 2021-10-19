import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import   mongoose from 'mongoose';
import { Qualifications, QualificationsDocument } from './qualification.schema';


@Injectable()
export class QualificationsService {
  constructor(
    @InjectModel(Qualifications.name)
    private readonly qualificationsModel: Model<QualificationsDocument>,
  ) {}



  async createQualifications(obj): Promise<any> {
    try {
      let createQualifications = await this.qualificationsModel.create(obj);
      return createQualifications;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllQualifications(): Promise<Qualifications[]> {
    try {
      const qualifications = await this.qualificationsModel.aggregate([
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
      return qualifications;
    } catch (e) {
      throw new Error(e);
    }
  }
  


  

  
}