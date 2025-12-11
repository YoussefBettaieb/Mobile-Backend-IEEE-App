import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Registration } from './registration.entity';
import { RegistrationService } from './registration.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Registration, User])],
  controllers: [EventsController],
  providers: [EventsService, RegistrationService],
})
export class EventsModule {}
