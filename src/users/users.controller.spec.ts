import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let createdUser: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    createdUser = await prismaService.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe('findAll (GET /users)', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
  });

  describe('findOne (GET /users/:id)', () => {
    it('should return a user with the given id', () => {
      return request(app.getHttpServer())
        .get(`/users/${createdUser.id}`)
        .expect(200)
        .expect((res) => {
          const user: User = res.body as User;
          expect(user).toHaveProperty('id', createdUser.id);
          expect(user.email).toBe('test@example.com');
          expect(user.name).toBe('Test User');
        });
    });

    it('should return 404 if user is not found', () => {
      return request(app.getHttpServer()).get('/users/999').expect(404);
    });
  });

  describe('create (POST /users)', () => {
    it('should create a new user', () => {
      const createUserDto = { email: 'new@example.com', name: 'New User' };
      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          const user: User = res.body as User;
          expect(user).toHaveProperty('id');
          expect(user.email).toBe(createUserDto.email);
          expect(user.name).toBe(createUserDto.name);
        });
    });
  });

  describe('update (PUT /users/:id)', () => {
    it('should update a user with the given id', () => {
      const updateUserDto = {
        email: 'updated@example.com',
        name: 'Updated User',
      };
      return request(app.getHttpServer())
        .put(`/users/${createdUser.id}`)
        .send(updateUserDto)
        .expect(200)
        .expect((res) => {
          const user: User = res.body as User;
          expect(user).toHaveProperty('id', createdUser.id);
          expect(user.email).toBe(updateUserDto.email);
          expect(user.name).toBe(updateUserDto.name);
        });
    });

    it('should return 404 if user is not found', () => {
      const updateUserDto = {
        email: 'updated@example.com',
        name: 'Updated User',
      };
      return request(app.getHttpServer())
        .put('/users/999')
        .send(updateUserDto)
        .expect(404);
    });
  });

  describe('remove (DELETE /users/:id)', () => {
    it('should remove a user with the given id', () => {
      return request(app.getHttpServer())
        .delete(`/users/${createdUser.id}`)
        .expect(200)
        .expect((res) => {
          const user: User = res.body as User;
          expect(user).toHaveProperty('id', createdUser.id);
        });
    });

    it('should return 404 if user is not found', () => {
      return request(app.getHttpServer()).delete('/users/999').expect(404);
    });
  });
});
