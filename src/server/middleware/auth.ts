import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
import config from 'config';
import AuthenticationError from "../../errors/auth-error";

/**
 * authorization middleware. looking for header Authorization: Bearer {token}
 */
export default function auth(req: Request, res: Response, next: NextFunction) {

  let token;

  const header = req.headers.authorization;

  const headerMatch = header && header.match(/^Bearer (.*)$/);
  if (headerMatch) {
    token = headerMatch[1];
  } else {
    throw new AuthenticationError('Missing authentication token.');
    next();
  }

  try {
    if (process.env.NODE_ENV !== "production" && token === 'testToken') {
      next();
    } else {
      jwt.verify(token, config.get("jwt.secret"));
      next();
    }
  } catch (error) {
    throw new AuthenticationError("Authentication token invalid or expired.");
  }
};
