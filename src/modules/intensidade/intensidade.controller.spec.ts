import { Test, TestingModule } from '@nestjs/testing';
import { IntensidadeController } from './intensidade.controller';
import { IntensidadeService } from './intensidade.service';

describe('IntensidadeController', () => {
  let controller: IntensidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntensidadeController],
      providers: [IntensidadeService],
    }).compile();

    controller = module.get<IntensidadeController>(IntensidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
