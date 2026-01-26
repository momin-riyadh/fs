import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Bootstrap the NestJS application and start the HTTP server.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow the local frontend origins during development.
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
  });
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  // Log the bound port for quick verification in dev.
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
