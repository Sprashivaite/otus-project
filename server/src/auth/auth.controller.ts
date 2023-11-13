import { Controller, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginRequest,
} from 'src/proto/auth';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private authService: AuthService) {}

  async register(
    @Body(ValidationPipe) createUserDto: LoginRequest,
  ): Promise<{ message: string }> {
    await this.authService.register(
      createUserDto.username,
      createUserDto.password,
    );
    return { message: 'Пользователь создан' };
  }

  async login(
    @Body(ValidationPipe) loginDto: LoginRequest,
  ): Promise<{ token: string }> {
    const { username, password } = loginDto;
    const token = await this.authService.login(username, password);
    return { token };
  }
}
