import * as jspb from 'google-protobuf'



export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getUsername(): string;
  setUsername(value: string): User;

  getFirstname(): string;
  setFirstname(value: string): User;

  getLastname(): string;
  setLastname(value: string): User;

  getAge(): number;
  setAge(value: number): User;

  getAvatar(): string;
  setAvatar(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    age: number,
    avatar: string,
  }
}

export class AvatarUpload extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): AvatarUpload;

  getFilename(): string;
  setFilename(value: string): AvatarUpload;

  getImagedata(): Uint8Array | string;
  getImagedata_asU8(): Uint8Array;
  getImagedata_asB64(): string;
  setImagedata(value: Uint8Array | string): AvatarUpload;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AvatarUpload.AsObject;
  static toObject(includeInstance: boolean, msg: AvatarUpload): AvatarUpload.AsObject;
  static serializeBinaryToWriter(message: AvatarUpload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AvatarUpload;
  static deserializeBinaryFromReader(message: AvatarUpload, reader: jspb.BinaryReader): AvatarUpload;
}

export namespace AvatarUpload {
  export type AsObject = {
    userid: number,
    filename: string,
    imagedata: Uint8Array | string,
  }
}

export class FriendList extends jspb.Message {
  getFriendsList(): Array<User>;
  setFriendsList(value: Array<User>): FriendList;
  clearFriendsList(): FriendList;
  addFriends(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FriendList.AsObject;
  static toObject(includeInstance: boolean, msg: FriendList): FriendList.AsObject;
  static serializeBinaryToWriter(message: FriendList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FriendList;
  static deserializeBinaryFromReader(message: FriendList, reader: jspb.BinaryReader): FriendList;
}

export namespace FriendList {
  export type AsObject = {
    friendsList: Array<User.AsObject>,
  }
}

export class UserId extends jspb.Message {
  getId(): number;
  setId(value: number): UserId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserId.AsObject;
  static toObject(includeInstance: boolean, msg: UserId): UserId.AsObject;
  static serializeBinaryToWriter(message: UserId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserId;
  static deserializeBinaryFromReader(message: UserId, reader: jspb.BinaryReader): UserId;
}

export namespace UserId {
  export type AsObject = {
    id: number,
  }
}

export class FriendId extends jspb.Message {
  getId(): number;
  setId(value: number): FriendId;

  getFriendid(): number;
  setFriendid(value: number): FriendId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FriendId.AsObject;
  static toObject(includeInstance: boolean, msg: FriendId): FriendId.AsObject;
  static serializeBinaryToWriter(message: FriendId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FriendId;
  static deserializeBinaryFromReader(message: FriendId, reader: jspb.BinaryReader): FriendId;
}

export namespace FriendId {
  export type AsObject = {
    id: number,
    friendid: number,
  }
}

export class Message extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    message: string,
  }
}

