import { Test, TestingModule } from '@nestjs/testing';
import { AtletaController } from './atleta.controller';
import { AtletaService } from './atleta.service';

describe('AtletaController', () => {
  let controller: AtletaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtletaController],
      providers: [AtletaService],
    }).compile();

    controller = module.get<AtletaController>(AtletaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
