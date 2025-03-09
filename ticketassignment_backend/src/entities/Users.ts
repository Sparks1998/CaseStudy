import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders';
import { PersonalAccessToken } from './PersonalAccessToken';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Index('UQ_97672ac88f789774dd47f7c8be3', ['email'], { unique: true })
@Index('USERS_PRIMARY_KEY', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('character varying', { name: 'first_name', length: 255 })
  @Field(() => String)
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 255 })
  @Field(() => String)
  lastName: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  @Field(() => String)
  email: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToMany(
    () => PersonalAccessToken,
    (personalAccessToken) => personalAccessToken.user,
  )
  personalAccessTokens: PersonalAccessToken[];
}
