import { Injectable } from "@nestjs/common";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { CreateFileDto } from "./dto";

@Injectable()
export class AppService {
  private readonly volumePath = "/app/volume-data"; // Path to the mounted volume

  getHello(): string {
    return "Hello World! This is a Dockerized NestJS application.";
  }

  createFile(fileDetails: CreateFileDto): string {
    const { fileName, content } = fileDetails;

    const filePath = join(this.volumePath, `${fileName}.txt`);

    // Write to the file in the mounted volume
    writeFileSync(filePath, content, { flag: "w" });

    return `File ${fileName}.txt created.`;
  }

  readFile(fileName: string): string {
    const filePath = join(this.volumePath, `${fileName}.txt`);

    // Read the file from the mounted volume
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8");
      return `Content of ${fileName}.txt: ${content}`;
    } else {
      return `File ${fileName}.txt does not exist.`;
    }
  }
}
