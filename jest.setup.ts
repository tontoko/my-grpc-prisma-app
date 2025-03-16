import { TestPrismaClient } from './src/prisma/testPrismaClient.service';

jestPrisma.initializeClient(new TestPrismaClient());

beforeAll(() => {
  // jest.mock('./src/prisma/testPrismaClient.service', () => {
  //   return {
  //     TestPrismaClient: jest.fn().mockImplementation(() => {
  //       return jestPrisma.client;
  //     }),
  //   };
  // });
});
