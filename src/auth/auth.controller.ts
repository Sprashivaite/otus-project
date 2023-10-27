import { Controller, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AuthService', 'register')
  async register(
    @Body(ValidationPipe) createUserDto: LoginDto,
  ): Promise<{ message: string }> {
    await this.authService.register(
      createUserDto.username,
      createUserDto.password,
    );
    return { message: 'Пользователь создан' };
  }

  @GrpcMethod('AuthService', 'login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ token: string }> {
    const { username, password } = loginDto;
    const token = await this.authService.login(username, password);
    return { token };
  }
}
