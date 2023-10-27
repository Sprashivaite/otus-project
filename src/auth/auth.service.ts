import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: User): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    return user;
  }

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(username: string, password: string): Promise<void> {
    const userExists = await this.userRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new UnauthorizedException('Имя пользователя уже существует');
    }

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);

    await this.userRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 6;
    return bcrypt.hash(password, saltRounds);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
