import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from '@/entities/Tickets';

/**
 * TicketModule manages the ticket-related features of the application.
 * It includes the TicketService for business logic and TicketResolver for GraphQL queries and mutations.
 * It also integrates TypeORM to access the Tickets entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Tickets])],
  providers: [TicketResolver, TicketService],
})
export class TicketModule {}
