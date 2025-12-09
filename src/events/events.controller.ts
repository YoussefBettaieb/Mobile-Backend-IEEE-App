import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('/api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllEvents() {
    return this.eventsService.findAll();
  }
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }
}
