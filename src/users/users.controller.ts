import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async AllUsers() {
    return this.usersService.findAll();
  }

  @Get('me')
  async getCurrentUser(@Request() req: any) {
    return req.user;
  }

  @Put('me')
  async updateCurrentUser(@Request() req: any, @Body() body: UpdateUserDto) {
    const user: User = req.user;
    return this.usersService.update(user.email, body);
  }
}
