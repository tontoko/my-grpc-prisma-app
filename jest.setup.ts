import { TestPrismaClient } from './src/prisma/testPrismaClient.service';

jestPrisma.initializeClient(new TestPrismaClient());

beforeEach(() => {
  jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => {
        return jestPrisma.client;
      }),
    };
  });
});
