import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TestPrismaService } from '../prisma/test-prisma.service';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/proto/user';

describe('UsersController', () => {
  let controller: UsersController;
  let prismaService: TestPrismaService;
  let createdUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, TestPrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prismaService = module.get<TestPrismaService>(TestPrismaService);

    // テストデータの作成
    createdUser = await prismaService.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const usersObservable = controller.getAllUsers();
      const users: User[] = [];

      await new Promise<void>((resolve) => {
        usersObservable.subscribe({
          next: (user) => users.push(user),
          complete: () => resolve(),
        });
      });

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('test@example.com');
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const user = await firstValueFrom(
        controller.getUserById({ id: createdUser.id }),
      );

      expect(user.id).toBe(createdUser.id);
      expect(user.email).toBe('test@example.com');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = await firstValueFrom(
        controller.createUser({
          email: 'new@example.com',
          name: 'New User',
        }),
      );

      expect(newUser.email).toBe('new@example.com');
      expect(newUser.name).toBe('New User');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updatedUser = await firstValueFrom(
        controller.updateUser({
          id: createdUser.id,
          name: 'Updated User',
          email: 'edited@example.com',
        }),
      );

      expect(updatedUser.id).toBe(createdUser.id);
      expect(updatedUser.email).toBe('edited@example.com');
      expect(updatedUser.name).toBe('Updated User');
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user', async () => {
      await firstValueFrom(controller.deleteUserById({ id: createdUser.id }));

      const deletedUser = await prismaService.user.findUnique({
        where: { id: createdUser.id },
      });
      expect(deletedUser).toBeNull();
    });
  });
});
