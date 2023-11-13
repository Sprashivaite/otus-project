import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { UserId } from 'src/proto/message';

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

  async getMessagesByUser({
    senderId,
    receiverId,
  }: UserId): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId } },
        { sender: { id: receiverId }, receiver: { id: senderId } },
      ],
      relations: { sender: true, receiver: true },
    });

    return messages.map((item) => ({
      ...item,
      senderId: item.sender.id,
      receiverId: item.receiver.id,
    }));
  }
}
