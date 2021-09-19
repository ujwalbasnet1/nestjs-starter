export interface BaseInterfaceRepository<T> {
    create(data: T | any): Promise<T>;

    findOneById(id: string): Promise<T>;

    findOne(filterCondition: any): Promise<T>;

    findAll(): Promise<T[]>;

    remove(id: string);

    findWithRelations(relations: any): Promise<T[]>;

    update(id, detail: Partial<T>): Promise<T>;
}