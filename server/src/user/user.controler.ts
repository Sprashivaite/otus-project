import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FriendId, UserId, User as UserProto } from 'src/proto/user';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'getUser')
  // @UseGuards(JwtAuthGuard)
  async getUser({ id }: UserId): Promise<UserProto> {
    const user: UserProto = await this.userService.getUser(id);
    return user;
  }

  @GrpcMethod('UserService', 'changeUser')
  async changeUser(data: User): Promise<User> {
    const user: User = await this.userService.changeUser(data);
    return user;
  }

  @GrpcMethod('UserService', 'getFriends')
  async getFriends({ id }: User): Promise<{ friends: User[] }> {
    const users: User[] = await this.userService.getFriends(id);
    return { friends: users };
  }

  @GrpcMethod('UserService', 'addFriend')
  async addFriend({ id, friendId }: FriendId): Promise<{ message: string }> {
    const friend = await this.userService.addFriend(id, friendId);
    return friend;
  }
}
