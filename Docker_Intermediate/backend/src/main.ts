import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: "*", // Allow requests from Next.js frontend
    methods: "*", // Allowed methods
    allowedHeaders: "*", // Allowed headers
    // credentials: true, // Allow cookies if needed
  });

  await app.listen(3000);
  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
