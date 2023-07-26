import { Test, TestingModule } from '@nestjs/testing';
import { DinheiroService } from './dinheiro.service';

describe('DinheiroService', () => {
  let service: DinheiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinheiroService],
    }).compile();

    service = module.get<DinheiroService>(DinheiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
