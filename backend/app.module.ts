import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './src/transactions/transactions.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'root',
      password: 'root',
      database: 'EXPENSES',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      options: { trustServerCertificate: true },
      synchronize: true,
      logging: true
    }),
    TransactionsModule,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {
    if (this.dataSource.isInitialized) {
      console.log('db connection success');
    } else {
      console.error('db connection failure');
    }
  }
}
