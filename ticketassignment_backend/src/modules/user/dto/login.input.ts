import { Field , InputType } from '@nestjs/graphql';
import { IsBoolean , IsEmail , IsString } from 'class-validator';

/**
 * LoginInput is a GraphQL input type used for user authentication.
 * It validates the input fields using class-validator decorators.
 */
@InputType()
export class LoginInput {
  /**
   * User's email address for authentication.
   * @example 'user@example.com'
   */
  @Field(() => String, { description: 'Email field' })
  @IsEmail()
  email: string;

  /**
   * User's password for authentication.
   * @example 'securePassword123'
   */
  @Field(() => String, { description: 'Password field' })
  @IsString()
  password: string;

  /**
   * Boolean flag to indicate whether the token should be remembered.
   * @example true
   */
  @Field(() => Boolean)
  @IsBoolean()
  rememberToken: boolean;
}
