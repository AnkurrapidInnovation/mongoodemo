import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from '../dbconfig';
import {UsersModule} from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose';
import {SportsModule} from './sports/sports.module'
import {CarsModule} from './cars/cars.module'
import { AuthModule } from './auth/auth.module';
import {ProductsModule} from './products/products.module';
// import {QualificationModule} from './qualification/qualifications.module'



@Module({
  imports: [
    UsersModule,
    SportsModule,
    CarsModule,
    ProductsModule,
    // QualificationModule,
    AuthModule,


    // MongooseModule.forRoot('mongodb://localhost:27017/mongodemo')
    MongooseModule.forRoot(dbConfig.dbConnectionUrl()),

],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
