import { Prop, Schema } from '@nestjs/mongoose';

export type BaseDocument = BaseModel & Document;

@Schema({ timestamps: true })
export abstract class BaseModel {
    constructor(model?: Partial<BaseModel>) {
        Object.assign(this, model);
    }
}