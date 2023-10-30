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

  async changeUser(data: User): Promise<User> {
    const { age, firstName, lastName, id } = data;
    const user: User = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const updatedUser: User = await this.userRepository.save({
      ...user,
      age,
      firstName,
      lastName,
    });
    console.log(updatedUser);
    return updatedUser;
  }

  async getFriends(id: number): Promise<User[]> {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: { friends: true },
    });

    return user.friends;
  }

  async addFriend(id: number, friendId: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { friends: true },
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
    console.log(user);
    user.friends.push(friend);
    await this.userRepository.manager.save(user);
    return { message: `Друг ${friend.username} добавлен` };
  }
}
