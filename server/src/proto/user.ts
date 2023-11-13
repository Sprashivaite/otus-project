/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "userpackage";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
}

export interface AvatarUpload {
  userId: number;
  filename: string;
  imageData: Uint8Array;
}

export interface FriendList {
  friends: User[];
}

export interface UserId {
  id: number;
}

export interface FriendId {
  id: number;
  friendId: number;
}

export interface Message {
  message: string;
}

export const USERPACKAGE_PACKAGE_NAME = "userpackage";

export interface UserServiceClient {
  getUser(request: UserId): Observable<User>;

  changeUser(request: User): Observable<User>;

  addFriend(request: FriendId): Observable<Message>;

  getFriends(request: UserId): Observable<FriendList>;

  uploadAvatar(request: AvatarUpload): Observable<User>;
}

export interface UserServiceController {
  getUser(request: UserId): Promise<User> | Observable<User> | User;

  changeUser(request: User): Promise<User> | Observable<User> | User;

  addFriend(request: FriendId): Promise<Message> | Observable<Message> | Message;

  getFriends(request: UserId): Promise<FriendList> | Observable<FriendList> | FriendList;

  uploadAvatar(request: AvatarUpload): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUser", "changeUser", "addFriend", "getFriends", "uploadAvatar"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
