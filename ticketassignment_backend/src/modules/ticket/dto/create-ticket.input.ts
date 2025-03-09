import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

/**
 * CreateTicketInput is a GraphQL input type used for creating new tickets.
 * It validates the input fields using class-validator decorators.
 */
@InputType()
export class CreateTicketInput {
  /**
   * Optional ID of the associated event for the ticket.
   * @example 1
   */
  @Field(() => Int, { nullable: true })
  @IsInt()
  eventId?: number;

  /**
   * Quantity of tickets to create.
   * @example 50
   */
  @Field(() => Int)
  @IsInt()
  quantity: number;
}
