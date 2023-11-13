import * as jspb from 'google-protobuf'



export class FileUpload extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): FileUpload;

  getFilename(): string;
  setFilename(value: string): FileUpload;

  getUserid(): number;
  setUserid(value: number): FileUpload;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileUpload.AsObject;
  static toObject(includeInstance: boolean, msg: FileUpload): FileUpload.AsObject;
  static serializeBinaryToWriter(message: FileUpload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileUpload;
  static deserializeBinaryFromReader(message: FileUpload, reader: jspb.BinaryReader): FileUpload;
}

export namespace FileUpload {
  export type AsObject = {
    content: Uint8Array | string,
    filename: string,
    userid: number,
  }
}

export class FileInfo extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): FileInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
  static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileInfo;
  static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
}

export namespace FileInfo {
  export type AsObject = {
    filename: string,
  }
}

export class ImageFile extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): ImageFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImageFile.AsObject;
  static toObject(includeInstance: boolean, msg: ImageFile): ImageFile.AsObject;
  static serializeBinaryToWriter(message: ImageFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImageFile;
  static deserializeBinaryFromReader(message: ImageFile, reader: jspb.BinaryReader): ImageFile;
}

export namespace ImageFile {
  export type AsObject = {
    content: Uint8Array | string,
  }
}

