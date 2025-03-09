import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders';
import { Events } from './Events';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Index('UQ_bd5387c23fb40ae7e3526ad75ea', ['eventId'], { unique: true })
@Index('CREATE_TICKETS_TABLE_PRIMARY_KEY', ['id'], { unique: true })
@Entity('tickets', { schema: 'public' })
@ObjectType()
export class Tickets {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('integer', { name: 'event_id', unique: true })
  eventId: number;

  @Column('integer', { name: 'quantity' })
  @Field(() => Int)
  quantity: number;

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

  @OneToMany(() => Orders, (orders) => orders.ticket)
  @Field(() => [Orders])
  orders: Orders[];

  @OneToOne(() => Events, (events) => events.tickets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
  @Field(() => Events)
  event: Events;
}
