import { Test, TestingModule } from '@nestjs/testing';
import { IntensidadeService } from './intensidade.service';

describe('IntensidadeService', () => {
  let service: IntensidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntensidadeService],
    }).compile();

    service = module.get<IntensidadeService>(IntensidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
