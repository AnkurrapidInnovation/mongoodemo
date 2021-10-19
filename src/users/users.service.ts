// import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>) {}

  async findByUserName(username: string): Promise<Users> {
    // return this.users.find(user => user.username === username);
    try {
      return this.usersModel.findOne({
        userName: { $regex: '^' + username, $options: 'i' },
        userRole: { $in: [1, 2, 3] }
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async UserByUserName(username: string): Promise<Users> {
    // return this.users.find(user => user.username === username);
    try {
      return this.usersModel.findOne({ userName: { $regex: '^' + username, $options: 'i' }, userRole: 3 });
    } catch (e) {
      throw new Error(e);
    }
  }

  async findById(userId: ObjectId): Promise<Users> {
    try {
      return this.usersModel.findById(userId);
    } catch (e) {
      throw new Error(e);
    }
  }

  async changePassword(userId: ObjectId, newPassword: string): Promise<Users> {
    try {
      const password = await bcrypt.hash(newPassword, 10);
      const user = await this.usersModel.findById(userId);
      user.password = password;
      const result = await user.save();
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(user: Users): Promise<Users> {
    try {
      const data = new this.usersModel(user);
      const result = await data.save();
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async allUsers(): Promise<Users[]> {
    try {
      return this.usersModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }

  async createNewUser(obj): Promise<Users> {
    try {
      const create = await this.usersModel.create(obj);
      return create;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string): Promise<Users> {
    try {
      return this.usersModel.findOne({ email: email, userRole: 3 });
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUserProfile(userId, updateObj): Promise<any> {
    try {
      await this.usersModel.updateOne({ _id: userId }, updateObj);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async checkWalletAddress(wallerAddress): Promise<any> {
  //   try {
  //     const data = await this.usersModel.find({ 'wallets.address': wallerAddress, userRole: 3 });
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async checkWalletAddressForAdmin(wallerAddress): Promise<any> {
  //   try {
  //     const data = await this.usersModel.find({ 'wallets.address': wallerAddress, userRole: { $in: [1, 2] } });
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async searhcUserByEmail(email: string): Promise<any> {
  //   try {
  //     const data = await this.usersModel.find({ email: { $regex: email, $options: 'i' }, userRole: 3 });
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async searchUserByUserName(username: string): Promise<Users[]> {
  //   try {
  //     const data = await this.usersModel.find(
  //       { userName: { $regex: username, $options: 'i' }, userRole: 3 },
  //       { password: 0 }
  //     );
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async userByWalletAddress(wallerAddress: string): Promise<Users> {
  //   try {
  //     const data = await this.usersModel.findOne({ 'wallets.address': wallerAddress, userRole: 3 });
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}
