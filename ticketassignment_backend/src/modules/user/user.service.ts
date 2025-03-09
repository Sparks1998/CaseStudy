import { Injectable , UnauthorizedException } from '@nestjs/common';
import { LoginInput } from '@modules/user/dto/login.input';
import { Users } from '@/entities/Users';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalAccessToken } from '@/entities/PersonalAccessToken';
import { Token } from '@/common/token';
import { v4 as uuid } from 'uuid';

/**
 * UserService handles business logic related to user authentication and management.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(PersonalAccessToken)
    private personalAccessTokenRepository: Repository<PersonalAccessToken>,
  ) {}

  /**
   * Authenticates a user with the provided credentials and generates a personal access token.
   * @param {LoginInput} credentials - User credentials including email and password.
   * @returns An object containing the authentication token and user data.
   * @throws {UnauthorizedException} If the user is not found.
   */
  async login(credentials: LoginInput) {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
      where: [
        {
          email: credentials.email,
          password: credentials.password,
        },
      ],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const oldToken = await this.personalAccessTokenRepository.findOne({
      select: {
        id: true,
        token: true,
        rememberToken: true,
        tokenChangeCount: true,
      },
      where: {
        user: {
          id: user.id,
        },
      },
    });
    let token = '';
    if (!oldToken) {
      const tokenId = uuid();
      token = Token.tokenGenerator(tokenId);
      const personalAccessToken = new PersonalAccessToken();
      personalAccessToken.id = tokenId;
      personalAccessToken.user = user;
      personalAccessToken.token = token;
      personalAccessToken.rememberToken = credentials.rememberToken;
      await this.personalAccessTokenRepository.save(personalAccessToken);
    } else {
      token = oldToken.token;
    }

    return {
      token,
      user,
    };
  }
}
