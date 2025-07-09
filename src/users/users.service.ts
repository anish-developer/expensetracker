import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      updateUserDto,
      {
        new: true,
      },
    );
  }

  async getUser(userId: string) {
    return this.userModel.findById(new mongoose.Types.ObjectId(userId)).exec();
  }
  async getAllUsers() {
    return this.userModel.find().exec();
  }
}
