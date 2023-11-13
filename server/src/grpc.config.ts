import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcConfig: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    protoPath: [
      join(__dirname, './proto/user.proto'),
      join(__dirname, './proto/auth.proto'),
      join(__dirname, './proto/message.proto'),
      join(__dirname, './proto/files.proto'),
    ],
    package: ['userpackage', 'authpackage', 'messages', 'files'],
  },
};
