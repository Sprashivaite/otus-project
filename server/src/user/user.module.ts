import { Module } from '@nestjs/common';
import { UserController } from './user.controler';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthModule, AuthService, JwtService],
})
export class UserModule {}
