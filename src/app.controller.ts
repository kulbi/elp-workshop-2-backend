import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/example')
  getHello() {
    return { example: true };
  }
}
