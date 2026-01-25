import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Inject the application service.
  constructor(private readonly appService: AppService) {}

  // Simple health endpoint.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
