import { Args , Int , Mutation , Query , Resolver } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Events } from '@/entities/Events';
import { OrderInput } from '@/common/order.input';

/**
 * EventsResolver handles GraphQL queries and mutations related to event management.
 * It provides an entry point for creating, updating, retrieving, and deleting events through GraphQL.
 */
@Resolver(() => Events)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * Creates a new event using the provided input.
   * @param {CreateEventInput} createEventInput - Input data for creating an event.
   * @returns {Events} The created event entity.
   */
  @Mutation(() => Events)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  /**
   * Retrieves all events, optionally ordered by specified criteria.
   * @param {OrderInput} [orderBy] - Optional ordering criteria.
   * @returns {Promise<Events[]>} A list of all events in the system.
   */
  @Query(() => [Events], { name: 'events' })
  async findAll(
    @Args('order', { nullable: true }) orderBy: OrderInput,
  ): Promise<Events[]> {
    return this.eventsService.findAll(orderBy);
  }

  /**
   * Retrieves a single event by its ID.
   * @param {number} id - The ID of the event to retrieve.
   * @returns {Promise<Events>} The event entity.
   */
  @Query(() => Events, { name: 'event' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.eventsService.findOne(id);
  }

  /**
   * Updates an existing event using the provided input.
   * @param {UpdateEventInput} updateEventInput - Input data for updating an event.
   * @returns {Promise<Events>} The updated event entity.
   */
  @Mutation(() => Events)
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return await this.eventsService.update(
      updateEventInput.id,
      updateEventInput,
    );
  }

  /**
   * Removes an event by its ID.
   * @param {number} id - ID of the event to remove.
   * @returns {string} A confirmation message upon successful removal.
   */
  @Mutation(() => String)
  async removeEvent(@Args('id', { type: () => Int }) id: number) {
    await this.eventsService.remove(id);
    return 'Successfully removed';
  }
}
