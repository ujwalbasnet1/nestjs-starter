import { Module, DynamicModule, Global } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user/user.repository';
import { DatabaseModule } from './database.module';


@Module({
    providers: [UserRepository],
    exports: [UserRepository],
})
export class RepositoryModule { }