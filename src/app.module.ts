import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← VERY IMPORTANT
      envFilePath: '.src/env', // ✅ Load from .env file
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Event], // add your entities here
      synchronize: true, // auto-create tables in dev mode
    }),
    UsersModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
