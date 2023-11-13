/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "messages";

export interface UserId {
  senderId: number;
  receiverId: number;
}

export interface Message {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  time: string;
}

export interface MessageList {
  messages: Message[];
}

export interface Empty {
}

export const MESSAGES_PACKAGE_NAME = "messages";

export interface MessageServiceClient {
  sendMessage(request: Message): Observable<Message>;

  getMessagesByUser(request: UserId): Observable<MessageList>;

  joinChat(request: Empty): Observable<MessageList>;

  leaveChat(request: Empty): Observable<Empty>;
}

export interface MessageServiceController {
  sendMessage(request: Message): Promise<Message> | Observable<Message> | Message;

  getMessagesByUser(request: UserId): Promise<MessageList> | Observable<MessageList> | MessageList;

  joinChat(request: Empty): Observable<MessageList>;

  leaveChat(request: Empty): Promise<Empty> | Observable<Empty> | Empty;
}

export function MessageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendMessage", "getMessagesByUser", "joinChat", "leaveChat"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MESSAGE_SERVICE_NAME = "MessageService";
