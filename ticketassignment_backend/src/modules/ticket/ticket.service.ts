import { BadRequestException , Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from '@/entities/Tickets';
import { Repository } from 'typeorm';

/**
 * TicketService handles business logic related to ticket management,
 * including creation, purchasing, updating, and removal of tickets.
 */
@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepository: Repository<Tickets>,
  ) {}

  /**
   * Creates a new ticket using the provided input.
   * @param {CreateTicketInput} createTicketInput - Input data for creating a ticket.
   * @returns {Tickets} The created ticket entity.
   */
  async create(createTicketInput: CreateTicketInput): Promise<Tickets> {
    return await this.ticketRepository.save(
      this.ticketRepository.create(createTicketInput),
    );
  }

  /**
   * Handles the purchase of a ticket by reducing the available quantity.
   * @param {number} id - ID of the ticket to purchase.
   * @param {number} quantity - Number of tickets to purchase.
   * @returns {Tickets} The updated ticket entity.
   * @throws {BadRequestException} If the requested quantity exceeds available tickets.
   */
  async purchaseTicket(id: number, quantity: number): Promise<Tickets> {
    const ticket = await this.ticketRepository.findOne({
      relations: ['event'],
      where: {
        id: id,
      },
    });

    if (ticket.quantity < quantity) {
      throw new BadRequestException('Maximum quantity exceeded');
    }
    ticket.quantity -= quantity;
    return this.ticketRepository.save(ticket);
  }

  /**
   * Removes a ticket by its ID.
   * @param {number} id - ID of the ticket to remove.
   */
  async remove(id: number) {
    await this.ticketRepository.delete(id);
  }

  /**
   * Updates the quantity of a ticket.
   * @param {number} id - ID of the ticket to update.
   * @param {number} quantity - Quantity to add to the ticket's available stock.
   * @returns {Tickets} The updated ticket entity.
   * @throws {BadRequestException} If the ticket is not found.
   */
  async update(id: number, quantity: number): Promise<Tickets> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!ticket) {
      throw new BadRequestException('Not Found');
    }

    ticket.quantity += quantity;
    return this.ticketRepository.save(ticket);
  }
}
