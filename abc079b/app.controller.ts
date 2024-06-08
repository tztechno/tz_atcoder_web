import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('calculate')
  calculateLucasNumber(@Body('n') n: string): { result: number, process_time: number } {
    const parsedN = parseInt(n, 10); // 数値としてパース
    console.log(`Received request to calculate Lucas number for n = ${parsedN}`);
    if (isNaN(parsedN)) {
      throw new Error('Invalid number'); // エラーハンドリング
    }
    const result = this.appService.calculateLucasNumber(parsedN);
    console.log(`Calculated Lucas number: ${result.result}, process_time: ${result.process_time}`);
    return result;
  }
}