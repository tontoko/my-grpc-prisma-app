import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  GetUserByIdRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
  UpdateUserRequest,
  DeleteUserRequest,
} from 'src/proto/user';
import { Observable, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empty } from 'src/google/protobuf/empty';

@UserServiceControllerMethods()
@Controller('users')
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Observable<User> {
    const subject = new Subject<User>();

    this.usersService
      .findAll()
      .then((users) => {
        users.forEach((user) => {
          subject.next(user);
        });
        subject.complete();
      })
      .catch((error) => {
        subject.error(error);
      });

    return subject.asObservable();
  }

  @Get(':id')
  getUserById(request: GetUserByIdRequest): Observable<User> {
    return from(this.usersService.findOne(+request.id)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${request.id} not found`);
        }
        return user;
      }),
    );
  }

  @Post()
  createUser(request: CreateUserRequest): Observable<User> {
    const createUserDto = { email: request.email, name: request.name };
    return from(this.usersService.create(createUserDto));
  }

  @Put(':id')
  updateUser(request: UpdateUserRequest): Observable<User> {
    return from(this.usersService.update(request.id, request)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${request.id} not found`);
        }
        return user;
      }),
    );
  }

  @Delete(':id')
  deleteUserById(request: DeleteUserRequest): Observable<Empty> {
    return from(this.usersService.remove(+request.id)).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${request.id} not found`);
        }
        return {};
      }),
    );
  }
}
