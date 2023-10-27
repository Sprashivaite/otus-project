import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './user.entity';
import { FriendDto } from './user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'getUser')
  async getUser({ id }: User): Promise<User> {
    const user: User = await this.userService.getUser(id);
    return user;
  }
  @GrpcMethod('UserService', 'addFriend')
  async addFriend({ id, friendId }: FriendDto): Promise<{ message: string }> {
    const friend = await this.userService.addFriend(id, friendId);
    return friend;
  }
}
