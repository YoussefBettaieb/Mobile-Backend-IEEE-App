import { Exclude } from 'class-transformer';
import {
  OneToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Registration } from '../events/registration.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  fullName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Registration, (registration) => registration.user, {
    cascade: true,
  })
  registrations: Registration[];

  @AfterInsert() // hooks executed after saving
  logInsert() {
    console.log('inserted user with id:', this.id);
  }

  @AfterUpdate() // hooks executed after updating
  logUpdate() {
    console.log('updated user with id:', this.id);
  }

  @AfterRemove() // hooks executed after removing
  logRemove() {
    console.log('removed user with id:', this.id);
  }
}
