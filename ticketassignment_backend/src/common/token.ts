import base64url from 'base64url';
import * as crypto2 from 'crypto';

/**
 * The secret key used for token encryption and hashing.
 */
export const secret = process.env.ENCRYPTION_SECRET || 'Spark@Smart';

/**
 * Interface representing the data contained in a token.
 */
export interface TokenData {
  /**
   * The expiration time of the token in milliseconds since the epoch.
   */
  timeOut: number;
  /**
   * The unique identifier associated with the token.
   */
  tokenId: string;
}

/**
 * Token class handles generation and extraction of JWT-like tokens with custom encryption.
 */
export class Token {
  /**
   * Generates a signed token with a unique code and a 10-minute timeout.
   * @param {string} tokenCode - The unique token code to include in the token payload.
   * @returns {string} The generated token as a string.
   */
  static tokenGenerator(tokenCode: string): string {
    const header = {
      typ: 'JWT',
      alg: 'HS512',
    };

    const token = {
      timeOut: Date.now() + 10 * 60 * 1000,
      tokenId: tokenCode,
    } as TokenData;

    const token64 = base64url(JSON.stringify(token));

    const header64 = base64url(JSON.stringify(header));

    const hash = crypto2
      .createHmac('sha512', secret)
      .update(`${header64}.${token64}`)
      .digest('base64');
    const hash64 = base64url.fromBase64(hash);

    return `${header64}.${token64}.${hash64}`;
  }

  /**
   * Extracts and decodes token data from a provided token string.
   * @param {string} token - The token string to parse.
   * @returns {TokenData} The extracted data as a TokenData object.
   */
  static extractTokenData(token: string): TokenData {
    const tokenData = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.'),
    );
    const mapString = base64url.decode(tokenData);
    return JSON.parse(mapString) as TokenData;
  }
}
