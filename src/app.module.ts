import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalModule } from './core/injection/global.module';
import { dbConfig } from './database/config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(dbConfig().url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GlobalModule,
    UserModule,
    AuthModule,
  ],

  exports: [
    GlobalModule,
  ]
})
export class AppModule { }
