import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserTable1741252007592 } from '@/migration/1741252007592-CreateUserTable';
import { CreateEventsTable1741254149486 } from '@/migration/1741254149486-CreateEventsTable';
import { CreateTicketsTable1741254165676 } from '@/migration/1741254165676-CreateTicketsTable';
import { CreateOrdersTable1741254182636 } from '@/migration/1741254182636-CreateOrdersTable';
import { CreatePersonalAccessTokenTable1741255069309 } from '@/migration/1741255069309-CreatePersonalAccessTokenTable';
import { Events } from '@/entities/Events';
import { Orders } from '@/entities/Orders';
import { PersonalAccessToken } from '@/entities/PersonalAccessToken';
import { Tickets } from '@/entities/Tickets';
import { Users } from '@/entities/Users';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EventsModule } from '@modules/events/events.module';
import { TicketModule } from '@modules/ticket/ticket.module';
import { OrderModule } from '@modules/order/order.module';
import { UserModule } from '@modules/user/user.module';
import { SingletonModule } from '@public_modules/singleton/singleton.module';
import { AuthenticationMiddleware } from '@/middlewares/authentication/authentication.middleware';

@Module({
  imports: [
    SingletonModule,
    /**
     * TypeORM Configuration
     * Sets up the connection to the PostgreSQL database and defines migrations and entities.
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: 'events_db',
      entities: [Events, Orders, PersonalAccessToken, Tickets, Users],
      migrations: [
        CreateUserTable1741252007592,
        CreateEventsTable1741254149486,
        CreateTicketsTable1741254165676,
        CreateOrdersTable1741254182636,
        CreatePersonalAccessTokenTable1741255069309,
      ],
      schema: 'public',
      synchronize: false,
      logging: false,
      migrationsRun: true,
    }),
    /**
     * GraphQL Module Configuration
     * Integrates Apollo GraphQL with auto-schema generation and disables playground in production.
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      context: ({ req, res }) => ({ req, res }),
    }),
    EventsModule,
    TicketModule,
    OrderModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  /**
   * Applies authentication middleware globally to all routes.
   * @param consumer MiddlewareConsumer instance to manage middleware.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
