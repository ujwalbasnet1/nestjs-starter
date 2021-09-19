import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FieldError } from 'src/error-handler/field-exception';

import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }


    async create(userDto: CreateUserDto): Promise<User> {
        const createdCat = new this.userModel(userDto);
        return createdCat.save();
    }

    async createUser(user: CreateUserDto): Promise<User> {

        const isRegistered = await this.userModel.findOne({ email: user.email });

        if (isRegistered)
            throw new FieldError({ "email": "already registered" });

        let createdUser = new this.userModel(user)
        createdUser.password = await User.hashPassword(createdUser.password);

        return createdUser.save();
    }
}
