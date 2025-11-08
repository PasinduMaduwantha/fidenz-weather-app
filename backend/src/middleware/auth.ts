import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE!;

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
  }) as GetVerificationKey,
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
        email?: string;
        [key: string]: any;
      };
      user?: {
        sub: string;
        email?: string;
      };
    }
  }
}

export const addUserInfo = (req: Request, res: Response, next: NextFunction): void => {
  if (req.auth) {
    req.user = {
      sub: req.auth.sub,
      email: req.auth.email || req.auth[`${AUTH0_AUDIENCE}/email`]
    };
  }
  next();
};
