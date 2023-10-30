import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @GrpcMethod('MessageService', 'sendMessage')
  async sendMessage(data: {
    text: string;
    senderId: number;
    receiverId: number;
  }) {
    const { text, senderId, receiverId } = data;
    return await this.messageService.createMessage(senderId, receiverId, text);
  }

  @GrpcMethod('MessageService', 'getMessagesByUser')
  async getMessagesByUser(data: { id: number }) {
    const messages = await this.messageService.getMessagesByUser(data);
    console.log(messages);
    return { messages };
  }
}
