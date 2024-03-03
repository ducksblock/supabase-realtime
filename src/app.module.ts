import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: 5432,
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASS,
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    })
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
