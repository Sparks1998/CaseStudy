import { BadRequestException , Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Repository } from 'typeorm';
import { Events } from '@/entities/Events';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInput } from '@/common/order.input';

/**
 * EventsService handles business logic related to event management,
 * including creating, updating, retrieving, and deleting events.
 */
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
  ) {}

  /**
   * Creates a new event using the provided input.
   * @param {CreateEventInput} createEventInput - Input data for creating an event.
   * @returns {Events} The created event entity.
   */
  async create(createEventInput: CreateEventInput): Promise<Events> {
    const eventDate = new Date(createEventInput.eventDate);

    return await this.eventRepository.save(
      this.eventRepository.create({
        eventName: createEventInput.eventName,
        eventDate,
      }),
    );
  }

  /**
   * Retrieves all events, optionally ordered by specified criteria.
   * @param {OrderInput} orderBy - Optional ordering criteria.
   * @returns {Promise<Events[]>} A list of all events in the system.
   */
  async findAll(orderBy: OrderInput): Promise<Events[]> {
    return await this.eventRepository
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.tickets', 'tickets')
      .orderBy(`events.${orderBy.field}`, orderBy.direction)
      .getMany();
  }

  /**
   * Retrieves a single event by its ID.
   * @param {number} id - The ID of the event to retrieve.
   * @returns {Promise<Events>} The event entity.
   */
  async findOne(id: number): Promise<Events> {
    return await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * Updates an existing event using the provided input.
   * @param {number} id - The ID of the event to update.
   * @param {UpdateEventInput} updateEventInput - Input data for updating the event.
   * @returns {Promise<Events>} The updated event entity.
   */
  async update(
    id: number,
    updateEventInput: UpdateEventInput,
  ): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });
    event.eventName = updateEventInput.eventName;
    event.eventDate = new Date(updateEventInput.eventDate);
    return await this.eventRepository.save(event);
  }

  /**
   * Removes an event by its ID.
   * @param {number} id - ID of the event to remove.
   */
  async remove(id: number) {
    await this.eventRepository.delete(id);
  }
}
