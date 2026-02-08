import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  
  const mockEpisodeService = {
    findAll: async () => [{id: 'id'}],
    findFeaturedEpisode: async() => [{id: 'id'}],
    // findOne: async() => [{id: 'id'}],
    findOne: mockFindOne,
    create: async() => [{id: 'id'}],
  }

  beforeEach(async () => {
    jest.resetAllMocks(); // Mock return value
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      // providers: [EpisodesService] // normal test
      providers: [ { provide: EpisodesService, useValue: mockEpisodeService }], // mock test
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => { 
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'my episode' }; // handler returns the mock result

    beforeEach(() => {
      mockFindOne.mockResolvedValue(mockResult);
    });

    it('should call the service with correct params', async () => {
      await controller.findOne(episodeId);
      expect(mockFindOne).toHaveBeenCalledWith(episodeId);
    })

    it('should return correct response', async () => {
      // const episodeId = 'id';
      const result = await controller.findOne(episodeId);
      expect(result).toEqual(mockResult);
    })

  });

  describe('findOne', () => { 
    describe('when episode is found', () => {
      const episodeId = 'id';
      const mockResult = { id: episodeId, name: 'my episode' }; // handler returns the mock result

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should call the service with correct params', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      })

      it('should return correct response', async () => {
        // const episodeId = 'id';
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResult);
      });
    })

    describe('when episode is not found', () => {
      const episodeId = 'id2';
      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow('Episode not found');
      });
    })
  });
});
