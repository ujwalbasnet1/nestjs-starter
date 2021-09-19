import { Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseInterfaceRepository } from './base.interface.repository';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> implements BaseInterfaceRepository<T> {


    private model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    async update(id: any, detail: Partial<T>): Promise<T> {
        let entry = await this.model.findById(id)

        if (!entry) {
            throw new NotFoundException("record not found")
        }

        Object.assign(entry, detail);
        let updatedEntry = new this.model(entry)
        return updatedEntry.save();
    }

    public async create(data: T | any): Promise<T> {
        let newEntry = new this.model(data)
        return newEntry.save();
    }

    public async save(data: Model<T> | any): Promise<T> {
        let entry = new this.model(data)
        // entry.updatedAt = new Date()
        return entry.save();
    }

    public async findOneById(id: string): Promise<T> {
        return this.model.findById(id);
    }

    public async findOne(filterCondition: any): Promise<T> {
        return await this.model.findOne({ where: filterCondition });
    }

    public async findWithRelations(relations: any): Promise<T[]> {
        return await this.model.find(relations)
    }

    public async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    public async remove(id: string) {
        return await this.model.remove(id);
    }

}