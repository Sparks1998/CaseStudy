import { Test, TestingModule } from '@nestjs/testing';
import { SingletonService } from './singleton.service';

describe('SingletonService', () => {
  let service: SingletonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingletonService],
    }).compile();

    service = module.get<SingletonService>(SingletonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
