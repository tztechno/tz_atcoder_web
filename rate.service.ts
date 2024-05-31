import { Injectable } from '@nestjs/common';

@Injectable()
export class RateService {
    getContest(rate: number): string {
        if (rate < 1200) {
            return 'ABC';
        } else {
            return 'ARC';
        }
    }
}