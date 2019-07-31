import { Test, TestingModule } from '@nestjs/testing';
import { TiendaController } from './tienda.controller';

describe('Tienda Controller', () => {
  let controller: TiendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaController],
    }).compile();

    controller = module.get<TiendaController>(TiendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
