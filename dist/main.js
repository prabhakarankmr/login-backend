"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
        keyPrefix: 'middleware',
        points: 100,
        duration: 60,
    });
    app.use(async (req, res, next) => {
        try {
            await rateLimiter.consume(req.ip);
            next();
        }
        catch (rejRes) {
            res.status(429).send('Too Many Requests');
        }
    });
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: [
            configService.get('FRONTEND_URL'),
            'http://localhost:3000',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    });
    const port = configService.get('PORT') || 3001;
    await app.listen(port, 'localhost');
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map