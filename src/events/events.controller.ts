import {
  Get,
  Post,
  Delete,
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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Events')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('/api/events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private registrationService: RegistrationService,
  ) {}

  @ApiOperation({ summary: 'Get all events' }) // swagger doc
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
  @ApiOperation({ summary: 'Create a new event (Admin only)' }) // swagger doc
  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }

  @ApiOperation({ summary: 'Get event by ID' }) // swagger doc
  @Get(':id')
  async getEventById(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @ApiOperation({ summary: 'Register current user to an event' }) // swagger doc
  @Post(':id/register')
  async registerToEvent(@Request() req: any, @Param('id') id: number) {
    return this.registrationService.registerUserToEvent(req.user.id, id);
  }

  @ApiOperation({ summary: 'Unregister current user from an event' }) // swagger doc
  @Delete(':id/register')
  async unregisterFromEvent(@Request() req: any, @Param('id') id: number) {
    return this.registrationService.unregister(req.user.id, id);
  }

  @ApiOperation({ summary: 'Get registrations for an event' }) // swagger doc
  @Get(':id/registrations')
  async getEventRegistrations(@Param('id') id: number) {
    return this.registrationService.getEventAttendees(id);
  }

  @ApiOperation({ summary: 'Get users registered for an event (Admin only)' }) // swagger doc
  @UseGuards(AdminGuard)
  @Get(':id/registered-users')
  async getRegisteredUsers(@Param('id') id: number) {
    return this.registrationService.getRegisteredUsers(id);
  }
}
