import { IsBoolean, IsOptional, IsString, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class CreateEpisodeDto { //dto: Data Transfer Object
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    featured?: boolean;

    @IsDate()
    @Type(() => Date)
    publishedat: Date;
}