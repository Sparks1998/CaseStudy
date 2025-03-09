import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tickets } from './Tickets';
import { Users } from './Users';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Index('CREATE_ORDERS_TABLE_PRIMARY_KEY', ['id'], { unique: true })
@Entity('orders', { schema: 'public' })
@ObjectType()
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('integer', { name: 'purchased_amount' })
  @Field(() => Int)
  purchasedAmount: number;

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

  @ManyToOne(() => Tickets, (tickets) => tickets.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ticket_id', referencedColumnName: 'id' }])
  @Field(() => Tickets)
  ticket: Tickets;

  @ManyToOne(() => Users, (users) => users.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => Users)
  user: Users;
}
