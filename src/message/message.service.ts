import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(
    senderId: number,
    receiverId: number,
    text: string,
  ): Promise<Message> {
    const message = this.messageRepository.create({
      text,
      sender: { id: senderId },
      receiver: { id: receiverId },
    });
    return this.messageRepository.save(message);
  }

  async getMessagesByUser({ id }: { id: number }): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: [{ sender: { id } }, { receiver: { id } }],
      relations: { sender: true, receiver: true },
    });
    return messages.map((item) => ({
      ...item,
      senderId: item.sender.id,
      receiverId: item.receiver.id,
    }));
  }
}
