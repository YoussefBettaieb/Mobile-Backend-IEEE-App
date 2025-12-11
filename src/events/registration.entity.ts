import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from './event.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.registrations)
  user: User;

  @ManyToOne(() => Event, (event) => event.userRegistrations)
  event: Event;

  @CreateDateColumn()
  registeredAt: Date;
}
