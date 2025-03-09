import { Inject , Injectable , NestMiddleware , UnauthorizedException  } from '@nestjs/common';
import { SingletonService } from '@public_modules/singleton/singleton.service';
import { DataSource } from 'typeorm';
import { PersonalAccessToken } from '@/entities/PersonalAccessToken';

/**
 * AuthenticationMiddleware handles request authentication by verifying authorization tokens.
 * It ensures that only authenticated users can access protected routes.
 */
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject(SingletonService) private readonly auth: SingletonService,
    private readonly connections: DataSource,
  ) {}

  /**
   * Middleware logic to authenticate requests.
   * @param req The incoming request object.
   * @param res The response object.
   * @param next The next function to proceed to the next middleware or request handler.
   * @throws {UnauthorizedException} If the request is not authenticated.
   */
  async use(req: any, res: any, next: () => void) {
    const needAuth =
      !req.body.query.includes('login') && !req.body.query.includes('register');
    if (!needAuth) {
      return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    const personalToken =
      await this.connections.manager.findOne<PersonalAccessToken>(
        PersonalAccessToken,
        {
          select: {
            id: true,
            token: true,
            rememberToken: true,
          },
          relations: ['user'],
          where: {
            id: token.tokenId,
          },
        },
      );

    if (!personalToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    this.auth.user = personalToken.user;

    return next();
  }
}
