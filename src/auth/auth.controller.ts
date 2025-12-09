import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.fullName,
    );
    return user;
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    return this.authService.signout();
  }

  //@Post('/password-reset'){}
}
