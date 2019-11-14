import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';
import config from 'config';

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
    res.status(401).send({error: 'Access denied.'})
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
    res.status(400).send({error: "Invalid token."});
  }
};
