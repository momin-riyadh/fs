import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Provide a basic response for the root route.
  getHello(): string {
    return 'Hello World!';
  }
}
