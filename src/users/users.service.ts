import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from 'src/proto/user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(data: { email: string; name?: string | null }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(
    id: number,
    data: { email?: string; name?: string | null },
  ): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }
}
