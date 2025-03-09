import { Args , Mutation , Query , Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Orders } from '@/entities/Orders';

/**
 * OrderResolver handles GraphQL queries and mutations related to order management.
 * It provides an entry point for creating orders and retrieving all orders through GraphQL.
 */
@Resolver(() => Orders)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order using the provided input.
   * @param {CreateOrderInput} createOrderInput - Input data for creating an order.
   * @returns {Orders} The created order entity.
   */
  @Mutation(() => Orders, { name: 'purchase' })
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Orders> {
    return this.orderService.create(createOrderInput);
  }

  /**
   * Retrieves all existing orders.
   * @returns {Orders[]} A list of all orders in the system.
   */
  @Query(() => [Orders], { name: 'orders' })
  findAll(): Promise<Orders[]> {
    return this.orderService.findAll();
  }
}
