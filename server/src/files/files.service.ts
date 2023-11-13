import { Injectable } from '@nestjs/common';
import {} from 'multer';
import * as fs from 'fs';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Injectable()
export class FilesService {
  constructor(private userRepository: UserRepository) {}

  async uploadedFile(content: Uint8Array, userId: number, fileName: string) {
    try {
      fs.writeFileSync(`./src/files/uploaded/${fileName}`, content);

      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('Пользователь не найден');
      }

      await this.userRepository.save({
        ...user,
        avatar: fileName,
      });
    } catch (e) {
      console.log('error', e);
    }
  }
  async getFile(fileName: string) {
    try {
      const fileBuffer = fs.readFileSync(`./src/files/uploaded/${fileName}`);

      const uint8Array = new Uint8Array(fileBuffer);
      return uint8Array;
    } catch (e) {
      console.log('error', e);
    }
  }
}
