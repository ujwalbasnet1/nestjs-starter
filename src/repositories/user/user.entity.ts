import { hashSync, genSaltSync } from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel } from 'src/core/base.model';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends BaseModel {
    @Prop({ name: "full_name" }) fullName: string;
    @Prop({ unique: true }) email: string;
    @Prop() age: number;
    @Prop() password: string;

    constructor(user?: Partial<User>) {
        super(user);
        Object.assign(this, user);
    }


    static async hashPassword(password: string) {
        return await hashSync(password, genSaltSync(10));

    }
}

export const UserSchema = SchemaFactory.createForClass(User);

