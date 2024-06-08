import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  calculateLucasNumber(n: number): { result: number, process_time: number } {
    const startTime = Date.now();
    const result = this.lucasNumber(n);
    const process_time = Date.now() - startTime;
    return { result, process_time };
  }

  private lucasNumber(n: number): number {
    if (n === 0) {
      return 2;
    } else if (n === 1) {
      return 1;
    } else {
      return this.lucasNumber(n - 1) + this.lucasNumber(n - 2);
    }
  }
}
