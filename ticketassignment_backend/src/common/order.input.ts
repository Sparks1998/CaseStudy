import { Field , InputType , registerEnumType } from '@nestjs/graphql';

/**
 * Enum representing the sorting direction for order inputs.
 */
export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderDirection, { name: 'OrderDirection' });

/**
 * OrderInput is a GraphQL input type used for specifying sorting options in queries.
 * It allows clients to define the field to sort by and the direction of sorting.
 */
@InputType()
export class OrderInput {
  /**
   * The field by which to order the results.
   * @example 'eventName'
   */
  @Field(() => String)
  field: string;

  /**
   * The direction in which to order the results (ASC or DESC).
   * @example OrderDirection.ASC
   */
  @Field(() => OrderDirection)
  direction: OrderDirection;
}
