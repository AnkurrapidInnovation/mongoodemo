import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from '../dbconfig';
import {UsersModule} from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose';
import {SportsModule} from './sports/sports.module'


@Module({
  imports: [
    UsersModule,
    SportsModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/mongodemo')
    MongooseModule.forRoot(dbConfig.dbConnectionUrl()),

],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
