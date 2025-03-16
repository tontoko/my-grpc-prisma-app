import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class TestPrismaClient extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'file:./test.db',
        },
      },
    });
  }
}

@Injectable()
export class TestPrismaService
  extends TestPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
