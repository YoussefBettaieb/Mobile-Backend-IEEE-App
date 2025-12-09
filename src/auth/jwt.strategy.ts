import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    const secret = process.env.JWT_SECRET || 'my_secret_key';
    console.log('🔑 JWT Secret being used:', secret); // LOG THE SECRET

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // payload.sub is user id
    console.log('🔍 JWT Payload received:', payload); // LOG PAYLOAD

    const user = await this.usersService.findOne(payload.email);
    console.log('👤 User found in DB:', user); // LOG USER

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // optionally throw if user not found
    return user; // assigned to req.user
  }
}
