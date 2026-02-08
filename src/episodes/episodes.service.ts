import { Injectable} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto'

// In nestJs: the class service will be injected in the controller, by NestJS at runtime
@Injectable()
export class EpisodesService {
    private episodes: Episode[] = [];

    async findAll(sort: 'asc' | 'desc' = 'asc') {
        const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1: -1);
        const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1: -1);

        return sort === 'asc'
        ? this.episodes.sort(sortAsc)
        : this.episodes.sort(sortDesc);
    }

    async findFeatured() {
        return this.episodes.filter((episode) => episode.featured);
    }

    async findOne(id: string) {
        return this.episodes.find((episode) => episode.id === id);
    }

    async create(createEpispdeDto: CreateEpisodeDto) {
        const newEpisode = { ...createEpispdeDto, id: randomUUID() };
        this.episodes.push(newEpisode);

        return newEpisode;
    }
}
