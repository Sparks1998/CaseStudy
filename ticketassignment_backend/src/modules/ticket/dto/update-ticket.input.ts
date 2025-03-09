import { CreateTicketInput } from './create-ticket.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

/**
 * UpdateTicketInput is a GraphQL input type used for updating existing tickets.
 * It extends CreateTicketInput, allowing partial updates with an additional required ID field.
 */
@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  /**
   * The ID of the ticket to update.
   * @example 1
   */
  @Field(() => Int)
  @IsInt()
  id: number;
}
