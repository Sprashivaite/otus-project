/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "files";

export interface FileUpload {
  content: Uint8Array;
  filename: string;
  userId: number;
}

export interface FileInfo {
  filename: string;
}

export interface ImageFile {
  content: Uint8Array;
}

export const FILES_PACKAGE_NAME = "files";

export interface FilesServiceClient {
  uploadFile(request: FileUpload): Observable<FileInfo>;

  getImage(request: FileInfo): Observable<ImageFile>;
}

export interface FilesServiceController {
  uploadFile(request: FileUpload): Promise<FileInfo> | Observable<FileInfo> | FileInfo;

  getImage(request: FileInfo): Observable<ImageFile>;
}

export function FilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["uploadFile", "getImage"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FilesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FilesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILES_SERVICE_NAME = "FilesService";
