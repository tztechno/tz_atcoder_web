import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('calculateLucasNumber', () => {
    it('should return the result and process time for a valid number', async () => {
      const result = { result: 123456, process_time: 500 };
      jest.spyOn(appService, 'calculateLucasNumber').mockImplementation(() => result);

      const n = '30'; // 有効な数値
      expect(await appController.calculateLucasNumber(n)).toBe(result);
    });

    it('should throw an error for an invalid number', async () => {
      const invalidN = 'invalid'; // 無効な数値
      await expect(appController.calculateLucasNumber(invalidN)).rejects.toThrow();
    });
  });
});
