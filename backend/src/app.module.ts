import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';
import * as path from 'path';

console.log('Используемая база данных:', path.join(__dirname, '..', 'db.sqlite'));
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: path.join(__dirname, '..', 'db.sqlite'),
            entities: [Transaction],
            synchronize: true,
        }),
        TransactionsModule,
    ],
})
export class AppModule { }
