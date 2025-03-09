import { Field , InputType } from '@nestjs/graphql';
import { IsNotEmpty , IsString , Validate } from 'class-validator';
import { CustomDateValidator } from '@/common/CustomDateValidator';

/**
 * CreateEventInput is a GraphQL input type used for creating new events.
 * It validates the input fields using class-validator decorators.
 */
@InputType()
export class CreateEventInput {
  /**
   * The name of the event.
   * @example 'Annual Tech Conference'
   */
  @Field(() => String)
  @IsString({
    message: 'Event name must be a string',
  })
  eventName: string;

  /**
   * The date of the event.
   * @example '2025-05-20T15:30:00.000Z'
   */
  @Field(() => String)
  @IsNotEmpty()
  @Validate(CustomDateValidator)
  eventDate: string;
}
