import { Field , InputType , Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

/**
 * CreateOrderInput is a GraphQL input type used for creating new orders.
 * It validates the input fields using class-validator decorators.
 */
@InputType()
export class CreateOrderInput {
  /**
   * ID of the ticket associated with the order.
   * @example 1
   */
  @Field(() => Int)
  @IsInt()

  /**
   * The quantity of tickets to be purchased in the order.
   * @example 5
   */
  id: number;
  @Field(() => Int)
  @IsInt()
  purchasedAmount: number;
}
