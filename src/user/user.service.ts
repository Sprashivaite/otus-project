import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async addFriend(id: number, friendId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const friend: User = await this.userRepository.findOne({
      where: { id: friendId },
    });
    if (!friend) {
      throw new Error('Друг не найден');
    }

    if (user.friends && user.friends.some((f) => f.id === friend.id)) {
      throw new Error('Этот пользователь уже ваш друг');
    }

    if (!user || !friend) {
      throw new Error('Пользователь или друг не найден.');
    }

    user.friends = user.friends || [];
    user.friends.push(friend);
    console.log(user);
    await this.userRepository.save(user);

    return { message: `Друг ${friend.username} добавлен` };
  }
}
