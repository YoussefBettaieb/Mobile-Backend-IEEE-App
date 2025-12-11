import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return this.eventsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getEventById(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }
}
