import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tickets } from './Tickets';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Index('CREATE_EVENTS_TABLE_PRIMARY_KEY', ['id'], { unique: true })
@Entity('events', { schema: 'public' })
@ObjectType()
export class Events {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('character varying', { name: 'event_name', length: 255 })
  @Field(() => String)
  eventName: string;

  @Column('timestamp with time zone', { name: 'event_date' })
  @Field(() => Date)
  eventDate: Date;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @OneToOne(() => Tickets, (tickets) => tickets.event)
  @Field(() => Tickets, { nullable: true })
  tickets: Tickets;
}
