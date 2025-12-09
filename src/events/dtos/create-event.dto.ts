import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsDateString,
  Min,
} from 'class-validator';
import { Chapter } from '../event.entity';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsString()
  category: string;

  @IsInt()
  @Min(0)
  attendeesNeeded: number;

  @IsInt()
  @Min(0)
  registrations: number;

  @IsString()
  level: string;

  @IsEnum(Chapter)
  chapter: Chapter;

  @IsBoolean()
  isFeatured: boolean;

  @IsString()
  speakerFullName: string;

  @IsString()
  aboutSpeaker: string;

  @IsString()
  prerequisites: string;

  @IsString()
  speakerLinkedin: string;
}
