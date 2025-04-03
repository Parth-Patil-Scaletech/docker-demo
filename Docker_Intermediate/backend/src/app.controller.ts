import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateFileDto } from "./dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("file")
  readFile(@Query("fileName") fileName: string): string {
    return this.appService.readFile(fileName);
  }

  @Post("file")
  createFile(@Body() fileDetails: CreateFileDto): string {
    return this.appService.createFile(fileDetails);
  }
}
