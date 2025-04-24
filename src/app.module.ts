import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'oladi',
      password: 'Rancho_10',
      database: 'product_listing',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule, 
  ],
})
export class AppModule {}
