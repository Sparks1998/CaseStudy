import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from '@/entities/Tickets';
import { Orders } from '@/entities/Orders';
import { TicketService } from '@modules/ticket/ticket.service';

/**
 * OrderModule manages the order-related features of the application.
 * It includes the OrderService for business logic and OrderResolver for GraphQL queries and mutations.
 * It also integrates TypeORM to access the Tickets and Orders entities.
 * Additionally, the TicketService is provided to handle ticket-related operations within orders.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Tickets, Orders])],
  providers: [OrderResolver, OrderService, TicketService],
})
export class OrderModule {}
