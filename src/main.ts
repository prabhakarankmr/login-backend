import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';
import { RateLimiterMemory } from 'rate-limiter-flexible';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 
    
  // Rate limiting
  const rateLimiter = new RateLimiterMemory({
    keyPrefix: 'middleware',
    points: 100, // Number of requests
    duration: 60, // Per 60 seconds
  });

  app.use(async (req, res, next) => {
    try {
      await rateLimiter.consume(req.ip);
      next();
    } catch (rejRes) {
      res.status(429).send('Too Many Requests');
    }
  });

  const configService = app.get(ConfigService);

  
  // Enable CORS
  app.enableCors({
    origin: [
      configService.get<string>('FRONTEND_URL'),
      'http://localhost:3000', // Development frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
    app.useGlobalFilters(new HttpExceptionFilter());
  // Set global prefix
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();