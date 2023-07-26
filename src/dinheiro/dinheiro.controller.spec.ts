import { Test, TestingModule } from '@nestjs/testing';
import { DinheiroController } from './dinheiro.controller';
import { DinheiroService } from './dinheiro.service';

describe('DinheiroController', () => {
  let controller: DinheiroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinheiroController],
      providers: [DinheiroService],
    }).compile();

    controller = module.get<DinheiroController>(DinheiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
