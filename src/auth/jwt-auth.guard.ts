import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const token = request.headers['authorization'];
    if (!token) {
      return false;
    }

    try {
      const payload = this.authService.validateUser(token);
      request.user = payload; // Добавить информацию о пользователе в объект запроса

      return true;
    } catch (error) {
      return false;
    }
  }
}
