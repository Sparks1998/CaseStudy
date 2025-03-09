import { CreateEventInput } from './create-event.input';
import { Field , InputType , Int , PartialType } from '@nestjs/graphql';

/**
 * UpdateEventInput is a GraphQL input type used for updating existing events.
 * It extends CreateEventInput, allowing partial updates with an additional required ID field.
 */
@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  /**
   * The ID of the event to update.
   * @example 1
   */
  @Field(() => Int)
  id: number;
}
