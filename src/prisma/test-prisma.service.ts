import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TestPrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'file:./test.db',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
