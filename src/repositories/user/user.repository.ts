import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/base.abstract.repository';
import { FieldError } from 'src/error-handler/field-exception';
import { User, UserDocument } from './user.entity';


@Injectable()
export class UserRepository extends BaseRepository<User>{
    private readonly logger = new Logger(UserRepository.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    async create(user: Partial<User>): Promise<User> {
        const isRegistered = await this.userModel.findOne({ email: user.email });

        if (isRegistered)
            throw new FieldError({ "email": "already used in another account" });

        let createdUser = new this.userModel(user)
        createdUser.password = await User.hashPassword(createdUser.password);

        return createdUser.save();
    }
}
