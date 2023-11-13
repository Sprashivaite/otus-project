import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { Subject } from 'rxjs';
import { MessageServiceControllerMethods, UserId } from 'src/proto/message';

@Controller()
@MessageServiceControllerMethods()
export class MessageController {
  private messages$ = new Subject();
  constructor(private readonly messageService: MessageService) {}

  async sendMessage(data: {
    text: string;
    senderId: number;
    receiverId: number;
  }) {
    const { text, senderId, receiverId } = data;
    const messages = await this.messageService.createMessage(
      senderId,
      receiverId,
      text,
    );
    this.messages$.next({ messages: [messages] });
    return { messages };
  }

  async getMessagesByUser(data: UserId) {
    const messages = await this.messageService.getMessagesByUser(data);
    return { messages };
  }

  async joinChat() {
    return this.messages$.asObservable();
  }

  async leaveChat() {
    this.messages$.complete();
  }
}
