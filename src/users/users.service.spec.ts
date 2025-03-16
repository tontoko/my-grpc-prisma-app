import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TestPrismaService } from '../prisma/testPrismaClient.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: TestPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useFactory: (prisma: TestPrismaService) => new UsersService(prisma),
          inject: [TestPrismaService],
        },
        TestPrismaService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<TestPrismaService>(TestPrismaService);

    // テスト用データのセットアップ
    await prismaService.user.create({
      data: { email: 'test1@example.com', name: 'Test User 1' },
    });
    await prismaService.user.create({
      data: { email: 'test2@example.com', name: 'Test User 2' },
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, email: 'test1@example.com', name: 'Test User 1' },
        { id: 2, email: 'test2@example.com', name: 'Test User 2' },
      ];
      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = { id: 1, email: 'test1@example.com', name: 'Test User 1' };
      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { email: 'test3@example.com', name: 'Test User 3' };
      const createdUser = await service.create(userData);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser.email).toBe(userData.email);
      expect(createdUser.name).toBe(userData.name);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userData = { email: 'updated@example.com', name: 'Updated User' };
      const updatedUser = await service.update(1, userData);
      expect(updatedUser.email).toBe(userData.email);
      expect(updatedUser.name).toBe(userData.name);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = await service.remove(1);
      expect(user).toBeDefined();
      const users = await service.findAll();
      expect(users.length).toBe(1);
    });
  });
});
