import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
    constructor(private readonly rateService: RateService) { }

    @Post()
    getContest(@Body() body: { rate: number }) {
        const { rate } = body;
        return this.rateService.getContest(rate);
    }
}