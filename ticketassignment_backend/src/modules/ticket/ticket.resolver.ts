import { Args , Int , Mutation , Resolver } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Tickets } from '@/entities/Tickets';

/**
 * TicketResolver handles GraphQL mutations related to ticket management.
 * It provides an entry point for creating, updating, and removing tickets through GraphQL.
 */
@Resolver(() => Tickets)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Creates a new ticket using the provided input.
   * @param {CreateTicketInput} createTicketInput - Input data for creating a ticket.
   * @returns {Tickets} The created ticket entity.
   */
  @Mutation(() => Tickets)
  async createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ): Promise<Tickets> {
    return await this.ticketService.create(createTicketInput);
  }

  /**
   * Updates an existing ticket using the provided input.
   * @param {UpdateTicketInput} updateTicketInput - Input data for updating a ticket.
   * @returns {Tickets} The updated ticket entity.
   */
  @Mutation(() => Tickets)
  async updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) : Promise<Tickets> {
    return await this.ticketService.update(
      updateTicketInput.id,
      updateTicketInput.quantity,
    );
  }

  /**
   * Removes a ticket by its ID.
   * @param {number} id - ID of the ticket to remove.
   * @returns {string} A confirmation message.
   */
  @Mutation(() => String)
  async removeTicket(@Args('id', { type: () => Int }) id: number) : Promise<string> {
    await this.ticketService.remove(id);
    return 'Successfully removed tickets';
  }
}
