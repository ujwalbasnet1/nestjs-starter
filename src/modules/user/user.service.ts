import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/repositories/user/user.entity';
import { UserRepository } from 'src/repositories/user/user.repository';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async update(userId: string, detail: Partial<User>): Promise<User> {
        return this.userRepository.update(userId, detail);
    }
}
