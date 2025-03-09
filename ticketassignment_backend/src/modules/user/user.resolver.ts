import { Args , Mutation , Query , Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from '@/entities/Users';
import { LoginInput } from '@modules/user/dto/login.input';

/**
 * UserResolver handles GraphQL queries and mutations related to user management.
 * It provides an entry point for executing operations on the Users entity through GraphQL.
 */
@Resolver(() => Users)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * GraphQL query to authenticate a user using login credentials.
   * @param {LoginInput} credentials - User credentials including email and password.
   * @returns An object containing the authentication token and user data.
   */
  @Mutation(() => Users, { name: 'login' })
  async login(@Args('userData') credentials: LoginInput) {
    const { token, user } = await this.userService.login(credentials);

    return {
      token,
      data: user,
    };
  }
}
