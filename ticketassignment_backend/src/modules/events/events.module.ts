import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from '@/entities/Events';

/**
 * EventsModule manages the event-related features of the application.
 * It includes the EventsService for business logic and EventsResolver for GraphQL queries and mutations.
 * It also integrates TypeORM to access the Events entity.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
