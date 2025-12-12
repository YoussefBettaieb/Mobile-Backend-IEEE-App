import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Controller,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { RegistrationService } from './registration.service';
import { EventsService } from './events.service';

@UseGuards(JwtAuthGuard)
@Controller('/api/events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private registrationService: RegistrationService,
  ) {}

  @Get()
  async getAllEvents() {
    return this.eventsService.findAll();
  }

  /* @Get()
  async getEvents(
    @Query('category') category?: string,
    @Query('chapter') chapter?: string,
    @Query('sort') sort?: string,
  ) {
    return this.eventsService.findFiltered({ category, chapter, sort });
  } */

  @UseGuards(AdminGuard)
  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }

  @Get(':id')
  async getEventById(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/register')
  async registerToEvent(@Request() req: any, @Param('id') id: number) {
    return this.registrationService.registerUserToEvent(req.user.id, id);
  }

  @Get(':id/registrations')
  async getEventRegistrations(@Param('id') id: number) {
    return this.registrationService.getEventAttendees(id);
  }
}
