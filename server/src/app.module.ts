import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import {
  GrpcReflectionModule,
  addReflectionToGrpcConfig,
} from 'nestjs-grpc-reflection';
import { FilesModule } from './files/files.module';
import { grpcConfig } from './grpc.config';

@Module({
  imports: [
    GrpcReflectionModule.register(addReflectionToGrpcConfig(grpcConfig)),
    FilesModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    MessageModule,
  ],
})
export class AppModule {}
