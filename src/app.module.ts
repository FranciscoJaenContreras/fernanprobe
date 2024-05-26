import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}.bggsmxe.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)],
  controllers: [],
  providers: [],
})
export class AppModule { }
