import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();

    res.on('finish', () => {
      const time = Date.now() - start;
      const forwardedFor = req.headers['x-forwarded-for'];
      const ip =
        (Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor?.split(',')[0]) ||
        req.ip ||
        req.socket.remoteAddress ||
        'unknown';

      console.log(
        `[${req.method}] ${req.originalUrl} ${res.statusCode} - ${time}ms - IP: ${ip.trim()}`,
      );
    });

    next();
  }
}
