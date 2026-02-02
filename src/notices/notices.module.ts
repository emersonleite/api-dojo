import { forwardRef, Module } from "@nestjs/common";
import { NoticesService } from "./notices.service";
import { NoticesController } from "./notices.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notice } from "./entities/notice.entity";
import { ResidentsModule } from "src/residents/residents.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
    forwardRef(() => ResidentsModule),
  ],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
