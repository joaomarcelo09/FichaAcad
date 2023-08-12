import { Test, TestingModule } from '@nestjs/testing';
import { AtletaService } from './atleta.service';

describe('AtletaService', () => {
  let service: AtletaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtletaService],
    }).compile();

    service = module.get<AtletaService>(AtletaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
