import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async AllUsers() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: any) {
    return req.user;
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateCurrentUser(@Request() req: any, @Body() body: UpdateUserDto) {
    const user: User = req.user;
    return this.usersService.update(user.email, body);
  }
}
