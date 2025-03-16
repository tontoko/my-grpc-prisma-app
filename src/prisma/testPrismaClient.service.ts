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
