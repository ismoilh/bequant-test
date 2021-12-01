import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';
import { configuration } from './configuration';
import { swagger } from './common/utils/swagger';
import { GlobalExceptionFilter } from './exceptions';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('ApiServer');

async function bootstrap() {
    const config = configuration();
    const {
        server: { port },
    } = config;

    const app = await NestFactory.create(AppModule);
    swagger(app);
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe({ exceptionFactory: (errors) => errors, transform: true, whitelist: true }));
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.enableCors();

    await app.listen(port);
    console.log(
        `\nServer is backed on: http://localhost:${port}/\nSwagger rest api: http://localhost:${port}/api-docs`,
    );
}
bootstrap().catch((error) => {
    logger.error(error);
});
