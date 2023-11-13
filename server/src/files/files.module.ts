import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [FilesController],
  providers: [FilesService, UserRepository],
})
export class FilesModule {}
