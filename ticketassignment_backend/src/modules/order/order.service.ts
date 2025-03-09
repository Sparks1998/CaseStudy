import { Inject , Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '@/entities/Orders';
import { Repository } from 'typeorm';
import { TicketService } from '@modules/ticket/ticket.service';
import { SingletonService } from '@public_modules/singleton/singleton.service';

/**
 * OrderService handles business logic related to order management,
 * including creating orders and retrieving all orders for the logged-in user.
 */
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    private readonly ticketService: TicketService,
    @Inject(SingletonService) private readonly auth: SingletonService,
  ) {}

  /**
   * Creates a new order by purchasing a ticket and saving the order details.
   * @param {CreateOrderInput} createOrderInput - Input data for creating an order.
   * @returns {Orders} The created order entity.
   */
  async create(createOrderInput: CreateOrderInput): Promise<Orders> {
    const ticket = await this.ticketService.purchaseTicket(
      createOrderInput.id,
      createOrderInput.purchasedAmount,
    );

    return await this.ordersRepository.save(
      this.ordersRepository.create({
        purchasedAmount: createOrderInput.purchasedAmount,
        ticket: ticket,
        user: this.auth.user,
      }),
    );
  }

  /**
   * Retrieves all orders associated with the currently authenticated user.
   * @returns {Orders[]} A list of orders belonging to the logged-in user.
   */
  async findAll(): Promise<Orders[]> {
    return await this.ordersRepository.find({
      relations: ['ticket', 'ticket.event'],
      order: {
        id: 'ASC',
      },
      where: {
        user: {
          id: this.auth.user.id,
        },
      },
    });
  }
}
