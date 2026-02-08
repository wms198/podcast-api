import { Body, Controller, Post, Get, Query, Param, HttpException, HttpStatus, NotFoundException, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive.pipe';
@Controller('episodes')
export class EpisodesController {
    // one way to tell nest to inject the service in the controller -> is to add a constructor to your class 
    // then you add a private parameter with the type episode service
    constructor(
        private episodesService: EpisodesService,
        private configService: ConfigService,
    ) {} 
    @Get()
    findAll(
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number, 
    ) {
        console.log(sort)
        return this.episodesService.findAll(sort);
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured();
    }

    // @Get(':id')
    // findOne(@Param() id:string) {
    //     console.log(id)
    //     return this.episodesService.findOne(id);
    // }

    @Get(':id')
    async findOne(@Param() id:string) {
        console.log(id)
        const episode = await this.episodesService.findOne(id);
        if(!episode) {
            // throw new Error('Episode not found')
            throw new NotFoundException('Episode not found') // retrun to frontend
        }
        return episode;
    }

    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto) {
        console.log(input)
        return this.episodesService.create(input);
    }

    // @Get()
    // findAll() {
    //     return 'all episodes'
    // }

}
