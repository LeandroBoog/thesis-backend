import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import config from '../configs/config';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwtHeader = req.header('simple-auth');
    console.log(config().auth.jwtToken);
    jwtHeader && jwtHeader === config().auth.jwtToken
      ? next()
      : res.status(401).send('Access denied!');
  }
}
