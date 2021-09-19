import { Module, DynamicModule, Global } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user/user.repository';
import { DatabaseModule } from './database.module';
import { RepositoryModule } from './repository.module';

@Global()
@Module({
    imports: [
        DatabaseModule,
        RepositoryModule,
    ],
    exports: [
        DatabaseModule,
        RepositoryModule,
    ],
    providers: [RepositoryModule],

})
export class GlobalModule { }