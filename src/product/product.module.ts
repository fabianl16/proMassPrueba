import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Product, ProductSchema } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ]),
    AuthModule
  ]
})
export class ProductModule {}
