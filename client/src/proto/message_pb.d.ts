import * as jspb from 'google-protobuf'



export class UserId extends jspb.Message {
  getSenderid(): number;
  setSenderid(value: number): UserId;

  getReceiverid(): number;
  setReceiverid(value: number): UserId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserId.AsObject;
  static toObject(includeInstance: boolean, msg: UserId): UserId.AsObject;
  static serializeBinaryToWriter(message: UserId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserId;
  static deserializeBinaryFromReader(message: UserId, reader: jspb.BinaryReader): UserId;
}

export namespace UserId {
  export type AsObject = {
    senderid: number,
    receiverid: number,
  }
}

export class Message extends jspb.Message {
  getId(): number;
  setId(value: number): Message;

  getText(): string;
  setText(value: string): Message;

  getSenderid(): number;
  setSenderid(value: number): Message;

  getReceiverid(): number;
  setReceiverid(value: number): Message;

  getTime(): string;
  setTime(value: string): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: number,
    text: string,
    senderid: number,
    receiverid: number,
    time: string,
  }
}

export class MessageList extends jspb.Message {
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): MessageList;
  clearMessagesList(): MessageList;
  addMessages(value?: Message, index?: number): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageList.AsObject;
  static toObject(includeInstance: boolean, msg: MessageList): MessageList.AsObject;
  static serializeBinaryToWriter(message: MessageList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageList;
  static deserializeBinaryFromReader(message: MessageList, reader: jspb.BinaryReader): MessageList;
}

export namespace MessageList {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

