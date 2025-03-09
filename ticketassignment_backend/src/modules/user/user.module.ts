import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@/entities/Users';
import { PersonalAccessToken } from '@/entities/PersonalAccessToken';

/**
 * UserModule manages the user-related features of the application.
 * It includes the UserService for business logic and UserResolver for GraphQL queries and mutations.
 * It also integrates TypeORM to access the Users and PersonalAccessToken entities.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Users, PersonalAccessToken])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
