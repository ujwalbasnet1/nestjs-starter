import { hashSync, genSaltSync } from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ name: "full_name" }) fullName: string;
  @Prop({ unique: true }) email: string;
  @Prop() age: number;
  @Prop() password: string;

  @Prop() createdAt: string;
  @Prop() updatedAt: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }


  static async hashPassword(password: string) {
    return await hashSync(password, genSaltSync(10));

  }
}

export const UserSchema = SchemaFactory.createForClass(User);

