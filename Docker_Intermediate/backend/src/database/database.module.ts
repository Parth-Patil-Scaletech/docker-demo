import { Global, Logger, Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        autoLoadEntities: true,
        synchronize: true, // Disable in production
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  onModuleInit() {
    const dbModuleLogger = new Logger(DatabaseModule.name);
    dbModuleLogger.debug("Database connection established successfully.");
  }
}
