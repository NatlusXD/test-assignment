import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() transactionData: Partial<Transaction>) {
    return this.transactionsService.create(transactionData);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
}
